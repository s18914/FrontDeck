# FrontDeck

FrontDeck helps frontend developers prepare for technical interviews with spaced repetition. It combines a public, searchable library of interview questions, each answered with links to official documentation, with personal study sessions scheduled by the SM-2 algorithm.

> Status: in active development.

## Features

- **Question library**: browse, search and filter questions by category, difficulty and tag. Every answer cites its sources (MDN, react.dev, nextjs.org, web.dev).
- **Study sessions**: review due questions as flashcards and rate recall as again, hard, good or easy. The next review date is scheduled with SM-2.
- **Dashboard**: questions due today, study streak and progress per category.
- **Bookmarks**: save questions to revisit later.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack) and [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/) in strict mode
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Drizzle ORM](https://orm.drizzle.team/) with [Neon](https://neon.tech/) Postgres
- [Zod](https://zod.dev/) for validation
- [Vitest](https://vitest.dev/) and [Testing Library](https://testing-library.com/) for unit tests, [Playwright](https://playwright.dev/) for end-to-end tests
- ESLint, Prettier and GitHub Actions
- Deployed on [Vercel](https://vercel.com/)

## Getting started

Requirements: Node.js 20.9 or later and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                 | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the development server                        |
| `npm run build`        | Create a production build                           |
| `npm run start`        | Serve the production build                          |
| `npm run lint`         | Lint with ESLint                                    |
| `npm run typecheck`    | Generate Next.js route types and type-check the app |
| `npm test`             | Run unit tests once                                 |
| `npm run test:watch`   | Run unit tests in watch mode                        |
| `npm run format`       | Format all files with Prettier                      |
| `npm run format:check` | Check formatting without writing changes            |

## Architecture decisions

Significant decisions are recorded as ADRs in [docs/decisions](docs/decisions):

1. [Runtime and toolchain versions](docs/decisions/0001-runtime-and-toolchain-versions.md)

## License

[MIT](LICENSE)
