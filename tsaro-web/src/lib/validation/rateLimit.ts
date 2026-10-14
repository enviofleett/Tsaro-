import { headers } from 'next/headers';

// Simple in-memory rate limiting for server actions
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 3;

export async function checkRateLimit(): Promise<{ success: boolean; error?: string }> {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown-ip';
  
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up old entries occasionally (primitive garbage collection)
  if (Math.random() < 0.01) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.lastReset > RATE_LIMIT_WINDOW) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return { success: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false, error: 'Too many requests. Please wait a minute and try again.' };
  }

  record.count += 1;
  return { success: true };
}
