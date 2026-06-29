# Task completion checklist

1. Verify against task spec boundaries (in-scope vs out-of-scope)
2. Re-read mandatory sources (Context7, task Source links)
3. Post Source verification in chat (Russian) before first edit
4. After edits:
   - `npm run slides:build` — if slides/** changed
   - `npm run lint` + `npm run typecheck` — if src/** changed
5. Update task status to `awaiting QA` when done (never `done` without owner OK)
6. Sync docs/ if slide flow or demo contract changed
7. Do not commit unless explicitly requested