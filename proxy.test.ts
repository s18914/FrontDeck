// @vitest-environment node
import { NextRequest } from 'next/server'
import {
  getRedirectUrl,
  unstable_doesMiddlewareMatch,
} from 'next/experimental/testing/server'
import { describe, expect, it } from 'vitest'
import { config, proxy } from './proxy'

describe('proxy', () => {
  it('redirects to the sign-in page when there is no session cookie', () => {
    const request = new NextRequest('http://localhost:3000/dashboard')
    const response = proxy(request)
    expect(response.status).toBe(307)
    expect(getRedirectUrl(response)).toBe('http://localhost:3000/login')
  })

  it('lets the request through when a session cookie is present', () => {
    const withCookie = new NextRequest('http://localhost:3000/dashboard')
    withCookie.cookies.set('session', 'anything')
    const response = proxy(withCookie)
    expect(getRedirectUrl(response)).toBe(null)
    expect(response.headers.get('x-middleware-next')).toBe('1')
  })
})

describe('proxy matcher', () => {
  it('runs on protected routes', () => {
    expect(unstable_doesMiddlewareMatch({ config, url: '/dashboard' })).toBe(
      true,
    )
    expect(unstable_doesMiddlewareMatch({ config, url: '/study/abc' })).toBe(
      true,
    )
  })

  it('does not run on public pages', () => {
    expect(unstable_doesMiddlewareMatch({ config, url: '/' })).toBe(false)
    expect(unstable_doesMiddlewareMatch({ config, url: '/questions' })).toBe(
      false,
    )
    expect(unstable_doesMiddlewareMatch({ config, url: '/login' })).toBe(false)
  })
})
