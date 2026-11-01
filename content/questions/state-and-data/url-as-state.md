---
title: When should UI state such as filters and pagination live in the URL?
category: state-and-data
level: mid
tags: [state, routing]
sources:
  - title: useSearchParams – Next.js docs
    url: https://nextjs.org/docs/app/api-reference/functions/use-search-params
---

Put state in the URL's **search params** when the user would expect to **share, bookmark or come back** to that exact view: filters, sorting, search query, current page, selected tab. The URL becomes the **single source of truth** and `useState` copies are not needed.

What you gain:

- **Shareable links** and bookmarks that reopen the same view.
- **Back and forward** buttons work naturally.
- State **survives a refresh**.
- In Next.js, Server Components can read `searchParams` and fetch the right data on the server.

```tsx
const searchParams = useSearchParams()
const router = useRouter()

function setPage(page: number) {
  const params = new URLSearchParams(searchParams)
  params.set('page', String(page))
  router.replace(`?${params}`)
}
```

Pitfalls:

- Values are **strings** — parse and validate them, and handle invalid input.
- Choose **`push` vs `replace`** consciously. Typing into a search box should not add a history entry per keystroke, so debounce and use `replace`.
- Don't put sensitive data or huge objects in the URL.
- Keep purely visual, temporary state (hover, an open dropdown) out of it.
