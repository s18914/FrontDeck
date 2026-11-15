# 4. Authentication

- Status: accepted
- Date: 2026-11-15

## Context

Study sessions, progress and bookmarks belong to a user, so the app needs sign-up, sign-in and sign-out. The only sign-in method needed is email and password. Users must be able to sign out for real, so a copied session cookie stops working after sign-out. Public question pages must keep their static shell (ADR 0003).

## Decision

Authentication is implemented in the app, without an auth library.

- **Database sessions instead of JWT.** Sign-in creates a random 32-byte token. The cookie holds the token, and the `session` table stores only its hash, the user ID and the expiry date. Sign-out deletes the row, so the token stops working immediately. A leaked database does not expose usable tokens.
- **Cookie:** `httpOnly`, `secure`, `sameSite: 'lax'`, `path: '/'` and an explicit expiry.
- **Password hashing with scrypt** from `node:crypto`, with a per-user salt. It needs no new dependency. OWASP recommends Argon2id first and scrypt when Argon2id is not available; Argon2id in Node.js requires a native package.
- **Session checks next to the data.** `verifySession` in the data access layer reads the cookie and the session row, wrapped in React `cache` so a request queries the database once. Every function that returns or changes user data calls it. Session data is never read inside `'use cache'`.
- **`proxy.ts` only for optimistic redirects**, for example from `/dashboard` to `/sign-in` when there is no cookie. It does not query the database and is not a security boundary.
- User-specific UI on public pages, such as the account menu in the header, renders under `<Suspense>`, so the rest of the page stays prerendered.

## Alternatives

- **Better Auth:** a complete, actively developed library with sessions, OAuth and rate limiting built in. A reasonable choice for a production app with more sign-in methods.
- **Auth.js:** now in maintenance mode, and its credentials provider discourages password sign-in.
- **Clerk and other hosted services:** user data lives with a third party, and the free tier has limits.
- **Stateless JWT sessions:** no database query per request, but a token stays valid until it expires, so sign-out and revoking a stolen session are not possible without a denylist.
- **bcrypt:** a common choice, but it needs a dependency and truncates passwords longer than 72 bytes.

## Consequences

- Every authenticated request queries the `session` table once.
- The app is responsible for what a library would provide: password hashing parameters, session expiry and cleanup, sign-in rate limiting and generic error messages that do not reveal whether an email exists.
- Server Actions are protected from CSRF by Next.js, which accepts only POST requests and compares the `Origin` header with the host, and by `sameSite: 'lax'`.
- Adding OAuth or passkeys later would be a good moment to move to a library.
