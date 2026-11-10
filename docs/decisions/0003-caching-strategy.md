# 3. Caching strategy

- Status: accepted
- Date: 2026-11-10

## Context

Next.js 16 introduced Cache Components. Nothing is cached unless it is marked with `'use cache'`, and any data that is neither cached nor wrapped in `<Suspense>` fails the build. Question content changes only on deploy, because the seed runs in the Vercel build (ADR 0002). Each deploy has a new build ID, which is part of every cache key, so a new deployment starts with an empty cache.

## Decision

`cacheComponents` and `partialPrefetching` are enabled in `next.config.ts`.

DAL functions that return shared data use `'use cache'` with `cacheLife('max')` and a tag (`questions`, `categories` or `tags`). The `Markdown` component is cached as well, because syntax highlighting is expensive and its output depends only on the Markdown text. `getQuestions` is not cached: free-text search would create a cache entry for every phrase, and the list already streams under `<Suspense>`.

Request-time data is read as low in the tree as possible. `/questions` sends a static shell with the filter form and streams the filtered list, so only the part that depends on `searchParams` waits for the request.

There is no revalidation for now, since content only changes with a new deployment. The tags are in place so that mutations can call `updateTag` once content can change at runtime.

## Alternatives

- **`dynamicParams = false` for a real 404 on unknown slugs:** not compatible with Cache Components.
- **`ensureStatic` on the question page:** a new and niche API, not worth it for this case.
- **Caching `getQuestions`:** rejected for the reason above.

## Consequences

- Unknown slugs return a soft 404: the status is 200, because the shell has already been sent, and Next.js adds `noindex`. The sitemap lists only existing questions.
- Per-user data, such as review progress, depends on cookies. It cannot be cached with `'use cache'` and must render under `<Suspense>`.
- Once content becomes editable in the app, every mutation must call `updateTag` for the affected tags.
