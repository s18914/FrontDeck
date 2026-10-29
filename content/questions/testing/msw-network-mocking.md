---
title: How does Mock Service Worker (MSW) mock the network, and why is it better than mocking fetch?
category: testing
level: mid
tags: [mocking, data-fetching, async]
sources:
  - title: Introduction – Mock Service Worker
    url: https://mswjs.io/docs/
---

MSW **intercepts requests at the network level** — through a Service Worker in the browser and request interceptors in Node — and answers them with responses from your **handlers**. Your app code keeps calling the real `fetch` or axios, **unchanged**.

```ts
const server = setupServer(
  http.get('/api/user', () => HttpResponse.json({ name: 'Ann' })),
)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('shows an error', async () => {
  server.use(http.get('/api/user', () => new HttpResponse(null, { status: 500 })))
  // render and assert the error message
})
```

Why it beats `vi.mock('./api')` or stubbing `fetch`:

- The **whole request path is tested**: URL, headers, JSON parsing, error handling, data-fetching libraries like TanStack Query.
- Tests don't depend on **which HTTP client** you use, so switching libraries doesn't break them.
- The **same handlers** work in tests, Storybook and local development before the backend is ready.
- `server.use()` overrides a handler **per test** for error and edge cases.
