---
title: Which HTTP security headers would you set on a web app, and what does each one do?
category: security
level: mid
tags: [http]
sources:
  - title: HTTP Headers – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html
---

A baseline set of response headers switches on protections the browser already has but won't use unless asked:

- **`Content-Security-Policy`** — controls where scripts, styles, frames and other resources may come from; the main second line of defense against XSS. Its `frame-ancestors` directive blocks clickjacking.
- **`Strict-Transport-Security`** — forces HTTPS on future visits.
- **`X-Content-Type-Options: nosniff`** — stops MIME sniffing, so an uploaded "image" can't be executed as a script.
- **`Referrer-Policy: strict-origin-when-cross-origin`** — prevents full URLs (paths, tokens in query strings) from leaking to other sites.
- **`Permissions-Policy`** — turns off powerful features you don't use, such as camera, microphone or geolocation, including inside iframes.
- **`X-Frame-Options: DENY`** — legacy clickjacking protection for older browsers.
- **`Cross-Origin-Opener-Policy: same-origin`** — isolates your window from cross-origin popups.

Also **remove** headers that reveal your stack, such as `X-Powered-By` (in Next.js, `poweredByHeader: false`). Don't rely on the deprecated `X-XSS-Protection`.

In Next.js, static headers go in `headers()` in `next.config.ts`; a nonce-based CSP has to be generated per request in `proxy.ts`.
