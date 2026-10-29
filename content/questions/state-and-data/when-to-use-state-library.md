---
title: When is local state, lifting state up or context enough, and when do you need a state management library?
category: state-and-data
level: mid
tags: [state, context]
sources: []
---

Start with the simplest tool and move up only when you hit a concrete problem. Most apps need **much less global client state** than people expect, especially once server data is handled by a fetching library.

A practical ladder:

1. **Local state** — the default. Keep state in the component that uses it.
2. **Lift state up** — when siblings need the same data, move it to the **closest common parent**.
3. **Context** — for values read by many components but **changed rarely**: user session, theme, locale, feature flags.
4. **A library** (Zustand, Redux Toolkit, Jotai) — when it becomes painful:
   - state is **updated often** and read by many distant components, and context re-renders **every consumer** on each change;
   - you need **selectors**, so a component re-renders only for the slice it uses;
   - update logic is complex, or you want DevTools, middleware or persistence.

Common pitfalls: storing **server data** in a global store (use TanStack Query or Server Components instead), and putting one large object in a single context, which turns every small change into a wide re-render.
