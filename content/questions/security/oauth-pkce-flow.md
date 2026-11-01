---
title: How does the OAuth 2.0 authorization code flow with PKCE work for a browser app, and where does OIDC fit in?
category: security
level: senior
tags: [auth, http]
sources:
  - title: OAuth2 – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html
  - title: PKCE – OAuth 2.0
    url: https://oauth.net/2/pkce/
---

The app redirects the user to the authorization server, receives a short-lived **authorization code**, and exchanges it for tokens. **PKCE** proves that the client redeeming the code is the same one that started the flow. The older **Implicit flow**, which returned tokens in the URL, is deprecated.

Steps:

1. The client creates a random **`code_verifier`**, its SHA-256 hash as the **`code_challenge`** (method `S256`), and a random **`state`**.
2. It redirects to `/authorize` with `response_type=code`, `client_id`, an exact `redirect_uri`, `scope`, `state` and `code_challenge`.
3. After login and consent, the server redirects back with `code` and `state`. The client checks that `state` matches, which protects the flow itself from CSRF.
4. The client POSTs the code **plus the original `code_verifier`** to `/token`. The server hashes the verifier and compares — someone who intercepted the code can't redeem it.

Why PKCE: a SPA is a **public client** and can't keep a client secret. PKCE replaces it with a one-time proof. The OAuth security best practice (RFC 9700) requires it for public clients.

**OIDC** adds identity on top: with the `openid` scope you also get an **ID token**, a JWT describing who logged in (validate its signature, `iss`, `aud`, `exp` and `nonce`). The **access token** is for calling APIs — don't send the ID token as an API credential.

The architectural decision: tokens held in the browser are exposed to XSS. Current guidance for browser apps favors a **backend-for-frontend** — the server (for example a Next.js Route Handler) runs the code flow as a confidential client, keeps tokens server-side and gives the browser only an HttpOnly session cookie. Add exact-match redirect URIs, short-lived access tokens and refresh token rotation.
