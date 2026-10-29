---
title: What consistency trade-offs come with optimistic UI, and when should you avoid it?
category: state-and-data
level: senior
tags: [state, data-fetching, concurrency]
sources: []
---

Optimistic UI makes the app feel instant by showing the result **before the server confirms it**. The price is that the UI can **briefly show a state that never becomes true**, and keeping client and server in agreement becomes your job.

Main consistency problems:

- **Failure and rollback** — the item appears, then disappears with an error. If the user already moved on, this is confusing, so the error must be clear and the input easy to retry.
- **Concurrent mutations** — two quick edits each take a snapshot. If the first fails, rolling back to its snapshot can **wipe out the second, successful change**. Prefer reconciling with the server (invalidate and refetch) over blindly restoring snapshots.
- **Out-of-order responses** — an older response or refetch overwrites a newer optimistic value. Cancel in-flight queries and refetch after the mutation settles.
- **Server-generated data** — ids, timestamps, computed totals and validation results are unknown up front. Use **temporary ids** and replace them when the response arrives.
- **Server rules** — permissions, stock limits or deduplication can make the server's result differ from the guess.

Good fit: high-success, low-stakes, easily reversible actions — likes, toggles, reordering, sending a chat message (with a "sending" indicator).

Avoid it for **payments, irreversible or destructive actions**, operations with a real chance of failure, and anything where showing a false success has legal or financial consequences. There, show a **pending state** instead.

Practical rules: mark optimistic items visually as pending, always re-sync from the server when the mutation settles, and make mutations **idempotent** on the backend so retries are safe.
