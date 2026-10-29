---
title: What does the React Compiler do, and how does it change the way you use useMemo and useCallback?
category: react
level: mid
tags: [memoization, rendering]
sources:
  - title: Introduction to React Compiler – React docs
    url: https://react.dev/learn/react-compiler/introduction
---

The React Compiler is a **build-time tool** that analyzes your components and hooks and **inserts memoization automatically**: computed values, callbacks and JSX are cached, so children stop re-rendering when their inputs have not changed. You get the effect of `useMemo`, `useCallback` and `memo` without writing them.

How it works:

- It runs as a plugin in the build (Babel, Vite, Next.js and others).
- It **relies on the Rules of React**: pure render, no mutation of props or state, hooks called correctly. When a component breaks these rules, the compiler **skips it** instead of producing wrong code. The `eslint-plugin-react-hooks` rules flag such code.
- It only memoizes **inside components and hooks**, and the cache is not shared between components.

Impact on manual memoization:

- **New code**: rely on the compiler. Use `useMemo` and `useCallback` only as an **escape hatch** when you need precise control, for example to keep an effect dependency stable.
- **Existing code**: leave existing memoization in place. Removing it can change the compiled output, so test before cleaning up.

It does not fix **algorithmic problems**: a slow calculation is still slow on its first run, and a list of 10,000 rows still needs virtualization.
