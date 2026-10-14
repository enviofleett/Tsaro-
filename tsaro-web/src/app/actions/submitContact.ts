"use server"

import { createClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/validation/rateLimit'

export async function submitContactMessage(formData: FormData) {
  try {
    const rateLimit = await checkRateLimit();
    if (!rateLimit.success) {
      return { success: false, error: rateLimit.error };
    }

    const supabase = await createClient()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return { success: false, error: 'All fields are required.' }
    }

    // Abuse Prevention: Prevent massive messages (spam)
    if (message.length > 5000) {
      return { success: false, error: 'Message exceeds the maximum permitted length.' }
    }

    // Abuse Prevention: Duplicate checking
    const { data: existingMessage } = await supabase
      .from('contact_messages')
      .select('id')
      .eq('email', email.trim())
      .gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString()) // last 1 hour
      .maybeSingle()

    if (existingMessage) {
      return { success: false, error: 'You have already sent a message recently. Please wait before sending another.' }
    }

    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert([
        { 
          name: name.trim(), 
          email: email.trim(),
          message: message.trim()
        }
      ])

    if (insertError) {
      return { success: false, error: 'We encountered an issue securely transmitting your message. Please try again later.' }
    }

    return { success: true }
  } catch (err: any) {
    return { success: false, error: 'An unexpected system error occurred. Please try again later.' }
  }
}
