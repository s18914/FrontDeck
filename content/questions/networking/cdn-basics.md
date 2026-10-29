---
title: What is a CDN and why would you put one in front of your site?
category: networking
level: junior
tags: [caching, http]
sources: []
---

A **CDN (Content Delivery Network)** is a network of servers spread around the world that **cache and serve your content from a location close to the user**, instead of every request travelling to your origin server.

Main benefits:

- **Lower latency** — a user in Tokyo gets files from a nearby edge server, not from Frankfurt.
- **Less load on the origin** — most requests for static files never reach your server.
- **Resilience** — CDNs absorb traffic spikes and help mitigate DDoS attacks.
- Extras like TLS termination, compression and image optimization at the edge.

What the CDN caches and for how long is controlled by **`Cache-Control`** headers (often `s-maxage` for shared caches). Static assets with **hashed file names** (`app.3f9a1c.js`) can be cached for a year, because a new build produces a new URL.
