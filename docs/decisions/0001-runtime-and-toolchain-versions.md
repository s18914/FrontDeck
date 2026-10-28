# 1. Runtime and toolchain versions

- Status: accepted
- Date: 2026-10-28

## Context

The project targets the latest stable Next.js (16.4) and React (19.3). Two runtimes are involved:

- **Production** runs on Vercel, which currently offers Node.js 24.x (default) and 22.x.
- **Local development** must work on Node.js 20.18.0. The development environment is shared with other projects and its Node.js version cannot be changed.

Next.js 16 supports Node.js 20.9 and later. Several current releases of the surrounding toolchain have raised their minimum Node.js version, mostly to 20.19, the first 20.x release that can `require()` ES modules without a flag:

| Package                   | Latest | Requires Node.js     | Latest compatible with 20.18 |
| ------------------------- | ------ | -------------------- | ---------------------------- |
| eslint                    | 10.x   | ^20.19, ^22.13, >=24 | 9.39                         |
| vitest                    | 5.x    | ^22.12, ^24, >=26    | 4.1                          |
| vite                      | 8.x    | ^20.19, >=22.12      | 6.4                          |
| @vitejs/plugin-react      | 6.x    | ^20.19, >=22.12      | 4.7                          |
| jsdom                     | 30.x   | ^22.22, ^24.15, >=26 | 26.1                         |
| @testing-library/jest-dom | 7.x    | >=22                 | 6.9                          |

## Options

1. **Use the latest toolchain and require Node.js 22+ for development.** Not possible in the current development environment.
2. **Run development on a project-local Node.js binary** (portable install or a version manager scoped to this directory). Possible, but adds setup friction and diverges from the documented `npm install && npm run dev` flow.
3. **Hold the toolchain on the newest releases that support Node.js 20.18** and verify compatibility in CI.

## Decision

Option 3. Application dependencies (Next.js, React, Tailwind CSS) stay on their latest releases. Development tooling is held on the versions listed in the last column above.

- `package.json` declares `"engines": { "node": ">=20.9.0" }`, matching Next.js.
- CI runs every check on both Node.js 20.18.0 and Node.js 24, so any dependency that drops support for the development runtime fails the build instead of surfacing on a developer machine.
- `@testing-library/jest-dom` uses a patch-level range (`~6.9.1`) because version 6.10 raised its Node.js requirement in a minor release.
- `engine-strict` is not enabled: `typescript-eslint`, a dependency of `eslint-config-next`, declares Node.js ^20.19 through `eslint-visitor-keys` but runs correctly on 20.18. The CI matrix is the authoritative compatibility check.

## Consequences

- ESLint 9 is marked as no longer supported upstream and receives no further fixes. Plugins and rules that require ESLint 10 are unavailable.
- Vitest 4 and Vite 6 lag behind the current majors; upgrade guides must be applied when the development runtime moves to Node.js 22 or later.
- Revisit this decision when the development environment can run Node.js 22+: upgrade the held packages, drop the 20.18.0 CI job and raise `engines.node`.
