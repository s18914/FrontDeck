---
title: When would you use a Route Handler instead of a Server Action?
category: nextjs
level: mid
tags: [server-actions, http]
sources: []
---

**Server Actions** are for **mutations triggered from your own React UI**, like form submits and button clicks. You call them like functions, they're typed end to end, and they integrate with forms (`useActionState`, progressive enhancement) and with the cache (`revalidatePath`, `updateTag`, `redirect`) in one round trip. They always use `POST` and have no stable public URL.

**Route Handlers** (`route.ts`) are **regular HTTP endpoints** with a URL and any method. Reach for them when:

- something **outside your React app** calls you: webhooks from Stripe or a CMS, a mobile app, cron jobs, third-party integrations;
- you need **`GET`** semantics, for example a public JSON API, an RSS feed or a file download;
- you need full control over the **response**: status codes, headers, streaming, non-JSON bodies;
- a client-side data library such as TanStack Query needs an endpoint to call.

A simple rule of thumb:

- **reading data** for a page: fetch it in a Server Component;
- **changing data from your UI**: use a Server Action;
- **an API that others consume**: build a Route Handler.

Both need the same security work: authenticate, authorize and validate inside the handler.
