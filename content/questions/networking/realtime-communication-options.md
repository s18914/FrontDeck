---
title: When would you choose WebSockets, Server-Sent Events or polling for real-time updates?
category: networking
level: mid
tags: [data-fetching, http]
sources:
  - title: Using server-sent events – MDN
    url: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
---

Use **polling** when updates are rare and a delay is acceptable, **Server-Sent Events** when only the **server pushes** data to the client, and **WebSockets** when you need **two-way, low-latency** communication.

- **Polling** — the client asks every N seconds. Trivial to build and works everywhere, but wastes requests and adds delay. **Long polling** keeps the request open until there is news.
- **SSE (`EventSource`)** — one long-lived HTTP response with `text/event-stream`. **One direction only** (server → client), text only, but with **automatic reconnection** and `Last-Event-ID` built in. Good for notifications, live feeds, streaming AI responses.
- **WebSockets** — an HTTP connection **upgraded** to a persistent, **full-duplex** channel (`wss://`) that supports binary data. Good for chat, multiplayer, collaborative editing. You handle reconnection, heartbeats and scaling (sticky sessions) yourself.

```ts
const events = new EventSource('/api/notifications')
events.onmessage = (e) => showToast(JSON.parse(e.data))
```

Pitfall: over HTTP/1.1, every open SSE stream uses one of the ~6 connections per domain. HTTP/2 multiplexing removes that limit.
