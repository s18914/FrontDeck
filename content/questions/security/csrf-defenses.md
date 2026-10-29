---
title: What is CSRF and how do you defend against it?
category: security
level: mid
tags: [auth, http]
sources:
  - title: Cross-Site Request Forgery Prevention – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
---

**Cross-site request forgery** makes a logged-in user's browser send a **state-changing request to your site from another site** — for example, a hidden auto-submitting form on `evil.example` that POSTs to `bank.example/transfer`. It works because the browser **attaches cookies automatically**. The attacker can't read the response, but the action still happens.

Defenses, best layered:

- **`SameSite` cookies** — `Lax` stops cookies on cross-site POSTs, iframes and fetches; `Strict` also on links from other sites. Chromium-based browsers default to `Lax`, but set it explicitly.
- **CSRF tokens** — a random token tied to the session, sent in a hidden field or header and checked by the server. The attacker's page can't read it.
- **Check `Origin`** (or `Sec-Fetch-Site`) on state-changing requests and reject foreign origins. Next.js Server Actions compare `Origin` with `Host` automatically.
- **Never change state on GET.**
- **Require JSON or a custom header** for APIs — a cross-site form can't send those without passing a CORS preflight.

If the API authenticates with a token in the `Authorization` header instead of a cookie, classic CSRF doesn't apply — but then the token is readable by JavaScript. And remember that **XSS defeats every CSRF defense**.
