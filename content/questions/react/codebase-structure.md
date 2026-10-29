---
title: How would you structure a large React codebase?
category: react
level: senior
tags: [modules, component-patterns]
sources: []
---

Organize code **by feature (domain), not by technical type**, and **colocate** everything a feature needs: components, hooks, API calls, types, tests and styles. Generic code lives in a separate shared layer, and dependencies point **one way**: features may import from shared, never the reverse.

A typical layout:

- `app/` holds routing, providers and layouts. In Next.js the `app/` directory stays thin and imports from features.
- `features/checkout/` contains `components/`, `hooks/`, `api.ts`, `types.ts`, tests next to the code, and an `index.ts` that is the feature's **public API**.
- `shared/ui`, `shared/lib`, `shared/hooks` hold design-system components and utilities with **no business knowledge**.

Principles:

- **Colocation first.** Keep code next to where it is used, and move it to `shared` only when a second feature really needs it. Premature "common" folders become dumping grounds.
- **Explicit boundaries.** Other features import only through a feature's public entry point. Enforce it with ESLint rules such as `no-restricted-imports` or a boundaries plugin, or with packages in a monorepo.
- **No cross-feature imports.** If two features need each other, extract the shared part or compose them one level up, in the page or route.
- Keep **barrel files** shallow. Deep re-export chains slow down dev tooling and can hurt tree-shaking.
- Separate **server data** (the fetching layer) from **UI state**, and keep naming and import aliases (`@/features/...`) consistent.

Why it pays off: a change touches **one folder**, ownership is clear, deleting a feature is easy, and code splitting naturally follows feature lines. Avoid over-engineering small apps: a flat structure is fine until it hurts.
