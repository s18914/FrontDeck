# 2. Database migrations on Vercel

- Status: accepted
- Date: 2026-10-30

## Context

Schema changes live in Drizzle migrations (`db/migrations`), and question content lives in Markdown files (`content/`). Vercel deploys code automatically, but nothing applies migrations or content to the databases it uses. The Neon integration gives production the `main` branch and every preview deployment its own branch, created from `main`.

## Decision

Vercel runs migrations and the seed before building the app, configured in `vercel.json`:

```
npm run db:migrate && npm run db:seed && npm run build
```

Each deployment brings its own database up to date. Preview deployments migrate a copy of production, so a migration is tested before it reaches `main`. The seed is idempotent, so content changes in `content/` are deployed the same way as code.

CI builds the app in compile mode (next build --experimental-build-mode=compile). This checks that the app compiles on both Node versions and needs no database.
The Vercel preview build verifies prerendering with real data, against a branch that already has the pull request's migrations.
With Cache Components, generateStaticParams must return at least one param, and cached database data is prerendered at build time. Skipping database queries in CI therefore stopped working. A CI database was rejected because it would not have those migrations, so a correct pull request that adds a column could fail in CI.

## Alternatives

- **Manual migrations from a local machine:** easy to forget and requires production credentials locally.
- **A migration job in GitHub Actions:** needs database secrets in GitHub and doesn't cover preview branches.

## Consequences

- Migrations run while the previous deployment is still serving traffic, and a failed build can leave a new schema with old code. Migrations must therefore be backward compatible: renames and drops are split into several deployments (expand and contract).
- Preview branches are deleted only when Vercel removes the deployments, so stale branches should be cleaned up in Neon from time to time.
