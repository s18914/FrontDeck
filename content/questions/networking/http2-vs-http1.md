---
title: What does HTTP/2 improve over HTTP/1.1, and what does HTTP/3 add on top?
category: networking
level: mid
tags: [http]
sources:
  - title: Evolution of HTTP – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Evolution_of_HTTP
---

**HTTP/2** keeps the same methods, headers and status codes but changes how they travel: a **binary protocol** with **multiplexing**, so many requests share **one TCP connection** in parallel, plus **header compression (HPACK)**. **HTTP/3** runs over **QUIC (on UDP)** to remove the remaining TCP-level bottleneck.

With HTTP/1.1, each connection handles one request at a time, and browsers open only about **6 connections per domain**. That led to hacks like bundling everything, image sprites and domain sharding. HTTP/2 makes many small requests cheap, so those hacks matter much less (sharding even hurts).

HTTP/2 still has **TCP head-of-line blocking**: one lost packet stalls every stream on the connection. HTTP/3 fixes that because QUIC handles packet loss **per stream**. It also combines the transport and TLS handshakes for a **faster connection setup** and survives network changes (Wi-Fi to mobile).

Note that **HTTP/2 server push** is effectively dead — Chrome removed it. Use `preload` or `103 Early Hints` instead.
