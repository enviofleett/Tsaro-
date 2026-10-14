"use server"

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/validation/rateLimit'

export async function submitAcademyBooking(formData: FormData) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.success) {
      return { error: rateLimit.error };
    }

    const supabase = await createClient()
    
    const courseCode = formData.get('courseCode') as string
    const courseName = formData.get('courseName') as string
    const candidateName = formData.get('candidateName') as string
    const candidateEmail = formData.get('candidateEmail') as string

    if (!candidateName || !candidateEmail || !courseCode) {
      return { error: 'Required fields are missing.' }
    }

    // Abuse Prevention: duplicate submission checking
    const { data: existingBooking } = await supabase
      .from('academy_bookings')
      .select('id')
      .eq('candidate_email', candidateEmail.trim())
      .eq('course_code', courseCode.trim())
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // last 24 hours
      .maybeSingle()

    if (existingBooking) {
      return { error: 'You have already requested a booking for this course recently. Our team will contact you shortly.' }
    }

    const { error: insertError } = await supabase
      .from('academy_bookings')
      .insert([
        {
          course_code: courseCode.trim(),
          course_name: courseName.trim(),
          candidate_name: candidateName.trim(),
          candidate_email: candidateEmail.trim()
        }
      ])

    if (insertError) {
      return { error: 'We encountered an issue submitting your booking request. Please try again later.' }
    }

    return { success: true }
  } catch (err: any) {
    return { error: 'An unexpected system error occurred. Please try again later.' }
  }
}
