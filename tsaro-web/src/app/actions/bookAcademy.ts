"use server"

import { createClient } from '@/utils/supabase/server'

export async function submitAcademyBooking(formData: FormData) {
  const supabase = createClient()
  
  const courseCode = formData.get('courseCode') as string
  const courseName = formData.get('courseName') as string
  const candidateName = formData.get('candidateName') as string
  const candidateEmail = formData.get('candidateEmail') as string

  if (!candidateName || !candidateEmail) {
    return { error: 'Name and email are required.' }
  }

  const { error } = await supabase
    .from('academy_bookings')
    .insert([
      {
        course_code: courseCode,
        course_name: courseName,
        candidate_name: candidateName,
        candidate_email: candidateEmail
      }
    ])

  if (error) {
    console.error('Booking Error:', error)
    return { error: 'Failed to submit booking.' }
  }

  return { success: true }
}
