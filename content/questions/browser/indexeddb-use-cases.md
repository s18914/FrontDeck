---
title: When would you use IndexedDB instead of localStorage?
category: browser
level: mid
tags: [storage, async]
sources:
  - title: IndexedDB API – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
---

Use IndexedDB when you need to store **a lot of structured data** in the browser, query it, or keep it **available offline**. `localStorage` is fine for a few small settings; IndexedDB is a real **client-side database**.

How they differ:

- **Size** — `localStorage` is limited to about 5 MB; IndexedDB can use a large share of free disk space.
- **Data types** — `localStorage` stores strings only; IndexedDB stores **objects, arrays, `Blob`s and files** without manual serialization.
- **API** — `localStorage` is synchronous and **blocks the main thread**; IndexedDB is **asynchronous** and works inside **Web Workers and service workers**.
- **Features** — IndexedDB has **object stores, indexes and transactions**, so you can look up records by a field instead of reading everything.

Typical use cases: offline-first apps, caching API responses or large lists, drafts of long forms, storing images or files before upload.

The raw API is event-based and verbose, so in practice people use a small wrapper such as **`idb`** (promise-based) or **Dexie**. Like all browser storage, it's per origin and can be **cleared by the user or the browser** under storage pressure, so don't treat it as the only copy of important data.
