---
title: What is an open redirect vulnerability, and how do you prevent it in a login flow?
category: security
level: senior
tags: [routing, auth]
sources:
  - title: Unvalidated Redirects and Forwards – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/Unvalidated_Redirects_and_Forwards_Cheat_Sheet.html
---

An open redirect happens when your app **redirects to a URL taken from user input without validating it**, e.g. `/login?returnTo=https://evil.example`. After a genuine login on your trusted domain, the user lands on a phishing copy of your site. It's also a building block for worse attacks: leaking OAuth codes or tokens through a redirect chain, or getting past domain allow-lists.

Prevention:

- Prefer **not passing URLs at all** — store the return path server-side, or pass an id that maps to an allowed destination.
- If you accept a return path, allow **only same-origin paths** and validate by **parsing**, not string matching:

```ts
function safeReturnTo(value: string | null, origin: string) {
  if (!value) return '/'
  try {
    const url = new URL(value, origin)
    return url.origin === origin ? url.pathname + url.search + url.hash : '/'
  } catch {
    return '/'
  }
}
```

- Naive checks fail: `startsWith('/')` accepts `//evil.example` (protocol-relative) and `/\evil.example` (browsers treat the backslash as a slash), and `includes('mysite.com')` accepts `mysite.com.evil.example`. Resolving with `new URL` and comparing origins handles all of these, and `javascript:` URLs end up with a `null` origin.
- For external destinations, use an **allow-list of exact origins** or an interstitial "You are leaving this site" page.
- Validate on the **server** before calling `redirect()`, and treat client-side `router.push(param)` or `location.href = param` the same way — there a `javascript:` value turns the open redirect into DOM-based XSS.
