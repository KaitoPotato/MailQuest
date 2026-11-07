# MailQuest

MailQuest turns a few chosen messages and calendar events into a boss fight. The battle advances when the browser agent verifies useful work, such as saving a reply draft or creating a calendar block.

## Current milestone

Milestone 1 is implemented: a responsive quest setup screen with sample inbox and calendar data. Select messages, choose a world, and forge a quest preview. This is a deterministic demo; it does not connect to an account, call an AI model, or perform browser actions yet.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. To check the current code, run `npm run typecheck` and `npm run build`.

If your environment cannot start the development file watcher, use `npm run build` followed by `npm run start` for a local preview.

See [PLAN.md](PLAN.md) for the build sequence, acceptance criteria, and demo plan.

## Project shape

- `app/`: Next.js UI and styles
- `lib/demo-data.ts`: synthetic inbox and calendar fixtures
- `lib/types.ts`: shared source and quest types
- `lib/quest.ts`: deterministic quest preview generator, to be replaced by model-assisted extraction

The `.gitignore` excludes browser authentication state and local environment files. Do not commit a signed-in browser profile or real message content.

