---
title: What are the trade-offs between JWT-based and session-based authentication?
category: security
level: mid
tags: [auth]
sources: []
---

With **sessions**, the server stores the session data and the client holds only a **random, opaque id**, looked up on every request. With **JWTs**, the token itself carries **signed claims** (user id, roles, expiry), so the server verifies the signature without a lookup — it's **stateless**.

Trade-offs:

- **Revocation** — a session can be ended instantly (logout, password change, ban). A JWT stays valid until it expires; revoking it needs a denylist, which brings state back. Hence **short-lived access tokens plus refresh tokens**.
- **Scaling** — JWTs avoid a shared session store, useful across many services.
- **Size** — a JWT travels with every request and grows with its claims; a session id is tiny.
- **Privacy** — a JWT payload is **base64url-encoded, not encrypted**. Anyone holding it can read it, so never put secrets inside.
- **Pitfalls** — always verify the signature, pin the expected algorithm (reject `alg: none`), and check `exp`, `iss` and `aud`.

Storage is a separate decision — a JWT can live in an HttpOnly cookie too. For a typical app with one backend, **server sessions** are simpler to secure; JWTs fit distributed APIs and federated login (OIDC).
