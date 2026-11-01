---
title: How does client-side routing in a single-page app work with the History API?
category: browser
level: mid
tags: [routing]
sources:
  - title: Working with the History API – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/History_API/Working_with_the_History_API
---

The router **intercepts link clicks**, calls `history.pushState()` to change the URL **without a page reload**, and renders the matching view itself. When the user presses Back or Forward, the browser fires a **`popstate`** event and the router renders the view for the new URL.

```ts
link.addEventListener('click', (e) => {
  e.preventDefault()
  history.pushState({}, '', '/products/42')
  render(location.pathname)
})

window.addEventListener('popstate', () => render(location.pathname))
```

Key points:

- **`pushState`** adds a new history entry; **`replaceState`** changes the current one (good for filters or redirects).
- `pushState` **doesn't fire `popstate`**, so the router must render after calling it.
- The server must return the app for **every route**, otherwise a refresh on `/products/42` gives a 404.
- The router also has to handle **scroll restoration** and focus management.

In Next.js, `<Link>` and `useRouter()` do this for you, and they also **prefetch** routes and fetch Server Component payloads instead of full HTML. A newer browser API, the **Navigation API**, offers a single `navigate` event for all navigations, but most routers are still built on the History API.
