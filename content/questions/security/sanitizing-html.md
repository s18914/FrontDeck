---
title: How do you safely render HTML that comes from users or a CMS?
category: security
level: mid
tags: [dom]
sources:
  - title: Cross Site Scripting Prevention – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html
---

First, avoid it if you can: store **plain text or Markdown** and render it with components. When you really need HTML (rich text editor, CMS), run it through an **allow-list sanitizer such as DOMPurify** right before inserting it.

```tsx
import DOMPurify from 'dompurify'

function Article({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } })
  return <div dangerouslySetInnerHTML={{ __html: clean }} />
}
```

Why this way:

- **Allow-list, not block-list** — keep only known-safe tags and attributes. Regex filters for `<script>` miss `onerror` handlers, `javascript:` URLs, SVG tricks, encoding quirks and mutation XSS, where the browser's own parser turns harmless-looking markup into an active payload.
- **Sanitize at output**, close to the sink, with an up-to-date library. Content sanitized at save time may face newer bypasses later.
- **Don't modify HTML after sanitizing** — that can reintroduce what was removed.
- DOMPurify needs a DOM: on the server, run it with jsdom or sanitize in the browser.
- Add **CSP** and, where supported, **Trusted Types** as a safety net, so a forgotten sink can't execute injected script.
