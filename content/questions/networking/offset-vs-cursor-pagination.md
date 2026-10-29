---
title: What is the difference between offset-based and cursor-based pagination?
category: networking
level: mid
tags: [data-fetching]
sources: []
---

**Offset pagination** asks for "skip N, take M" (`?page=3&limit=20`). **Cursor pagination** asks for "M items **after this specific item**" (`?after=abc123&limit=20`), where the cursor is an opaque pointer, usually based on an indexed column like `id` or `createdAt`.

Offset pros and cons:

- Easy to build, you can **jump to any page** and show "page 3 of 12".
- **Unstable with changing data** — if a new item is inserted while the user is on page 1, page 2 repeats an item; deletions make items get skipped.
- **Slow on deep pages**, because the database still has to walk over all skipped rows.

Cursor pros and cons:

- **Stable results** under inserts and deletes, and **consistent performance** at any depth thanks to the index.
- **No random access** — only "next" (and sometimes "previous"), and total counts are harder.

Rule of thumb: **cursor** for feeds, infinite scroll and large or fast-changing data; **offset** for admin tables where users need page numbers and the data is small. Libraries like TanStack Query's `useInfiniteQuery` map naturally to cursors via `getNextPageParam`.
