---
title: How would you choose a state management architecture for a large React application?
category: state-and-data
level: senior
tags: [state, data-fetching, server-components]
sources: []
---

Don't pick one tool for everything. First **classify the state by where it truly belongs**, then use the simplest tool for each category. Most problems in large apps come from mixing categories in one global store.

The usual categories:

- **Server state** — fetched data. Server Components for the initial load, plus **TanStack Query** (or RTK Query) for client-side caching, polling and mutations.
- **URL state** — filters, sorting, pagination, selected tab. **Search params**, so views are shareable.
- **Form state** — a form library or React 19 form actions, scoped to the form.
- **Local UI state** — open/closed, hover, input drafts. `useState` in the component, **colocated**.
- **Global client state** — usually small: session, theme, cart, feature flags. Context for rarely changing values, **Zustand or Redux Toolkit** when it changes often or has complex logic.

Decision criteria for the global part: how often it updates and how many components read it (re-render cost and **selectors**), how complex the update logic is, team size and the need for **conventions and DevTools**, and SSR.

Architecture rules that keep it maintainable:

- **Feature-based modules** that own their state, with a small public API instead of one mega store.
- **Derive, don't duplicate** — compute values with selectors rather than storing copies.
- With SSR, **create stores per request** (for example in a provider), never as a module-level singleton shared between users on the server.
- Write the decision down in an ADR so new code follows the same rules.

A good answer in an interview shows the classification first and names tools second.
