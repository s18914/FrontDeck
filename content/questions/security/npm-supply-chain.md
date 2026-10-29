---
title: What are the supply chain risks of npm dependencies, and how do you reduce them?
category: security
level: mid
tags: [bundling, modules]
sources:
  - title: NPM Security – OWASP Cheat Sheet Series
    url: https://cheatsheetseries.owasp.org/cheatsheets/NPM_Security_Cheat_Sheet.html
---

Every dependency, including transitive ones, runs with **full privileges** — on developer machines, in CI and in users' browsers. The main risks are **malicious packages** (typosquatted names, hijacked maintainer accounts publishing a poisoned version), **install scripts** that run on `npm install` and steal tokens, and **known vulnerabilities** in outdated packages.

Mitigations:

- **Commit the lockfile** and install with **`npm ci`** in CI — exact, reproducible versions; it fails if `package.json` and the lockfile disagree.
- Run **`npm audit`** and use Dependabot or Renovate to surface known vulnerabilities, but **review updates** instead of merging blindly.
- **Keep dependencies few** — each one is attack surface; don't add a package for a one-liner.
- **Vet new packages** — maintainers, repository, download history, recent ownership changes, typos in the name.
- **Restrict install scripts** (`ignore-scripts`, or a package manager that runs them only for approved packages) and consider waiting a few days before adopting freshly published versions.
- Protect publishing with **2FA** and short-lived tokens, and prefer packages with **provenance**.
- Load third-party scripts from CDNs with **Subresource Integrity**, or self-host them.
