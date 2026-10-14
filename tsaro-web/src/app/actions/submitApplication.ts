"use server"

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/validation/rateLimit'

export async function submitApplication(formData: FormData) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.success) {
      return { success: false, error: rateLimit.error };
    }

    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string
    const cvFile = formData.get('cv') as File

    if (!name || !email || !phone || !role || !cvFile) {
      return { success: false, error: 'All fields are required.' }
    }

    // Abuse Prevention: duplicate submission checking
    const { data: existingApp } = await supabase
      .from('career_applications')
      .select('id')
      .eq('email', email.trim())
      .eq('role', role.trim())
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // last 30 days
      .maybeSingle()

    if (existingApp) {
      return { success: false, error: 'You have already applied for this role recently.' }
    }

    // Security Validation: Validate file type and extension
    const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = cvFile.name.split('.').pop()?.toLowerCase() || '';

    if (!allowedMimeTypes.includes(cvFile.type) || !allowedExtensions.includes(fileExt)) {
      return { success: false, error: 'Invalid file format. Only PDF and Word documents are allowed.' }
    }

    // Ensure it's a small file (5MB limit)
    if (cvFile.size > 5 * 1024 * 1024) {
      return { success: false, error: 'CV must be less than 5MB.' }
    }

    // 1. Upload CV to Supabase Storage (cvs bucket)
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `applications/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(filePath, cvFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      return { success: false, error: 'Our system could not process the file upload at this time. Please try again later.' }
    }

    // Do NOT generate a public URL. Store the internal path instead.
    const internalPath = filePath;

    // 2. Insert record into career_applications table
    const { error: insertError } = await supabase
      .from('career_applications')
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          role: role.trim(),
          cv_url: internalPath
        }
      ])

    if (insertError) {
      return { success: false, error: 'We encountered an issue saving your application. Please try again later.' }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: 'An unexpected system error occurred. Please try again later.' }
  }
}
