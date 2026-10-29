---
title: How would you roll out a strict Content Security Policy in a Next.js app, and what does it cost?
category: security
level: senior
tags: [http, rendering]
sources:
  - title: How to set a Content Security Policy (CSP) for your Next.js application – Next.js docs
    url: https://nextjs.org/docs/app/guides/content-security-policy
  - title: Mitigate cross-site scripting (XSS) with a strict Content Security Policy – web.dev
    url: https://web.dev/articles/strict-csp
---

A **strict CSP** relies on **per-request nonces (or hashes) plus `'strict-dynamic'`** rather than domain allow-lists: only scripts carrying the nonce run, and scripts they load inherit that trust. Allow-lists are easy to bypass through JSONP endpoints or permissive CDNs, so a nonce-based policy is the one that actually stops injected scripts.

A typical policy: `script-src 'nonce-…' 'strict-dynamic'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`.

In Next.js:

- Generate a random nonce for every request in **`proxy.ts`** and set the CSP header on the request and the response. Next.js reads the nonce during server rendering and **adds it automatically** to framework scripts, page bundles and `<Script>`; third-party components can read it via `headers()`.
- **The main cost**: a nonce must be unique per response, so pages must be **dynamically rendered**. You lose static generation, ISR and CDN-cached HTML, and Partial Prerendering doesn't work with it — more latency and server load.
- **Alternative**: experimental **SRI** (`experimental.sri`) produces hash-based integrity for build-time scripts and keeps pages static, but can't cover scripts generated at request time.
- A policy without nonces (`'unsafe-inline'` scripts) set in `next.config.ts` is far weaker against XSS, though `frame-ancestors`, `object-src` and `base-uri` still add value.

Rollout:

- Ship it first as **`Content-Security-Policy-Report-Only`** with a reporting endpoint, fix violations (inline handlers, analytics tags, inline styles), then enforce.
- Development needs `'unsafe-eval'` because React uses `eval` for debugging; production doesn't.
- CSP is **defense in depth** — it limits the impact of an XSS bug but doesn't replace encoding and sanitization.
