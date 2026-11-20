import 'server-only'
import { headers } from 'next/headers'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

const emailLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  prefix: 'ratelimit:login:email',
})

const ipLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, '15 m'),
  prefix: 'ratelimit:login:ip',
})

export async function getClientIp() {
  const forwarded = (await headers()).get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}

export async function consumeLoginAttempt(email: string, ip: string) {
  const [byEmail, byIp] = await Promise.all([
    emailLimiter.limit(email),
    ipLimiter.limit(ip),
  ])
  return byEmail.success && byIp.success
}

export async function resetLoginAttempts(email: string) {
  await emailLimiter.resetUsedTokens(email)
}
