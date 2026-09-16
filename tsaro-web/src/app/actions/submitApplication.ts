"use server"

import { createClient } from '@/utils/supabase/server'

export async function submitApplication(formData: FormData) {
  try {
    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string
    const cvFile = formData.get('cv') as File

    if (!name || !email || !phone || !role || !cvFile) {
      return { success: false, error: 'All fields are required.' }
    }

    // Ensure it's a PDF or small file
    if (cvFile.size > 5 * 1024 * 1024) {
      return { success: false, error: 'CV must be less than 5MB.' }
    }

    // 1. Upload CV to Supabase Storage
    const fileExt = cvFile.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `applications/${fileName}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('cvs')
      .upload(filePath, cvFile, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('CV Upload Error:', uploadError)
      return { success: false, error: 'Failed to upload CV. Please ensure the "cvs" storage bucket exists and is public.' }
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('cvs').getPublicUrl(filePath)
    const cvUrl = publicUrlData.publicUrl

    // 2. Insert record into career_applications table
    const { error: insertError } = await supabase
      .from('career_applications')
      .insert([
        {
          name,
          email,
          phone,
          role,
          cv_url: cvUrl
        }
      ])

    if (insertError) {
      console.error('Insert Error:', insertError)
      return { success: false, error: 'Failed to save application. Please ensure the career_applications table exists.' }
    }

    return { success: true }
  } catch (err: any) {
    console.error('Unexpected Error:', err)
    return { success: false, error: err.message || 'An unexpected error occurred.' }
  }
}
