---
title: What are the main differences between the App Router and the Pages Router?
category: nextjs
level: mid
tags: [routing, rendering]
sources: []
---

The **App Router** (`app/`) is the current, recommended router, built on **React Server Components**. The **Pages Router** (`pages/`) is the older model: still supported, but it gets few new features.

Key differences:

- **Components**: App Router components are **Server Components by default**. In the Pages Router every page component is shipped and hydrated in the browser.
- **Data fetching**: the App Router fetches inside **async components** and caches with `'use cache'` or `fetch` options. The Pages Router used page-level functions: `getServerSideProps`, `getStaticProps` and `getStaticPaths` (now `generateStaticParams`).
- **Layouts**: nested `layout.tsx` files that persist across navigation, instead of a single `_app` and hand-rolled layout patterns.
- **Loading and errors**: built-in `loading.tsx` (streaming with Suspense) and `error.tsx` per segment.
- **Mutations and APIs**: **Server Actions** and `route.ts` Route Handlers instead of `pages/api` routes.
- **Routing hooks**: `next/navigation` instead of `next/router`.
- **Metadata**: `metadata` and `generateMetadata` exports instead of `next/head`.

Both routers can live in one project during an **incremental migration**, as long as their routes don't overlap. New projects should start with the App Router.
