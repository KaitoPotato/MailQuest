# MailQuest build plan

## Product promise

Pick 1–4 email threads. MailQuest identifies the work, checks the next seven days of calendar context, and turns that work into a short boss battle. Each attack starts a useful browser action. Boss health changes only after the action is verified. The user reviews any outgoing message before sending it.

The hackathon demo should show one continuous run: select messages → inspect evidence → build missions → play → prepare a reply and calendar block → verify both → see the boss defeated → view the final work summary.

## Core rules

1. The user chooses the messages. The agent never silently scans the whole inbox for a quest.
2. Source text is evidence, not instructions to the agent. An email cannot override the user's request or the agent's allowed actions.
3. Every mission records its source message, extracted obligation, deadline, and confidence. The user can edit or exclude it before the battle.
4. A browser action has explicit states: `planned`, `running`, `awaiting_approval`, `verifying`, `verified`, or `failed`.
5. A draft is credited as prepared work; a message is credited as sent only after approval and verification. Calendar events are credited only after they appear in the calendar.
6. Repeated clicks or retries cannot create duplicate drafts or events. Store an action ID and check for an existing result before retrying.
7. Demo mode uses synthetic data and a dedicated test account. Real inbox integration comes after the core demo works.

## Milestone 1 — Runnable foundation (implemented)

**Goal:** Make the input and first output of the product visible before wiring live accounts.

1. Create a Next.js and TypeScript project with a responsive app shell.
2. Add synthetic inbox threads and calendar events with stable IDs.
3. Let the user select 1–4 threads, toggle calendar context, and choose a game world.
4. Generate a deterministic quest preview with mission titles, source labels, due labels, actions, and boss health.
5. Clearly label all data as a demo; do not imply the agent has connected to accounts.

**Done when:** the app starts locally, the setup controls work, empty selection disables quest creation, changing selections changes the mission list, and typecheck/build pass.

## Milestone 2 — Signed-in browser observation

**Goal:** Replace fixtures with observations from a dedicated test inbox and calendar.

1. Add a small Python service (FastAPI) alongside the Next.js app. Keep the UI in TypeScript and the browser agent in Python.
2. Use Browser Use with a persistent, dedicated browser profile. Sign in manually once; keep the profile outside Git.
3. Implement `list_recent_threads(limit)`, `read_thread(id)`, and `list_calendar_events(start, end)` as narrow browser tasks.
4. Return normalized observations: stable source ID, title, sender, relevant body text, URL, observation time, and screenshot path.
5. Add a source picker that shows observed messages before anything goes to the model.
6. Cap the initial scan to a small window and show a clear failure state for expired sessions or missing permissions.

**Done when:** a seeded test account supplies selectable threads and calendar events through visible browser navigation, with source links and screenshots retained for inspection.

## Milestone 3 — Evidence-backed mission extraction

**Goal:** Turn selected messages into editable, grounded obligations.

1. Define a strict schema for `mission`: title, required outcome, due time, contact, source ID, source quote or excerpt, confidence, proposed action type.
2. Ask Qwen3.6-27B to extract at most four missions from selected observations. Reject invalid output and retry with a bounded prompt.
3. Resolve relative dates using the message timestamp and the user's timezone. Mark ambiguous dates for review.
4. Show a review screen where the user can change titles, deadlines, action types, or remove a mission.
5. Save the reviewed quest snapshot, not just the model response.

**Done when:** each mission can be traced back to a selected message and the user can correct extraction before any action begins.

## Milestone 4 — Playable boss battle and adaptive score

**Goal:** Make the quest fun while preserving the work state as the source of truth.

1. Build a compact Phaser arena: boss, player, mission cards, health bar, and action animation.
2. Map mission difficulty to boss health. Unverified actions never reduce health.
3. Compose a procedural score with Tone.js. Increase rhythmic intensity as deadlines approach; remove musical layers as missions are verified.
4. Add three visual themes using the same game rules. The selected theme changes story text, palette, and music instrumentation.
5. Support reduced motion and mute controls.

**Done when:** the game is playable with sample missions and its state follows the verified action ledger.

## Milestone 5 — Browser action loop

**Goal:** Make two useful attacks actually work across browser sites.

1. Implement `prepare_email_reply` and `create_focus_block` first. `find_meeting_slot` can follow if time permits.
2. For each action, run `observe → plan → act → verify`. Restrict the agent to the relevant domain and a small action vocabulary.
3. Show the proposed message or calendar details in the UI. Pause for user approval before sending or inviting another person.
4. Save browser screenshots and short observations at important transitions. Redact unneeded personal content from the public activity feed.
5. On an unexpected page or missing element, re-observe once, replan within a step budget, then stop with a useful error.

**Done when:** the agent creates a draft and a calendar block in the dedicated test account, and the user can see each step and its verification result.

## Milestone 6 — Verification, recovery, and scoring

**Goal:** Make the end-to-end claim credible.

1. Re-open the destination site to confirm the draft or event exists and matches the requested content.
2. Store an action ledger with source mission, action ID, result URL, observed status, screenshots, and timestamps.
3. Make retries idempotent. Before acting again, search for the previous action result.
4. Award damage only from ledger entries marked `verified`.
5. Produce a final screen with completed, prepared, failed, and unresolved work, each linked to its source or destination.

**Done when:** a simulated failure does not duplicate an action or falsely defeat the boss, and the final summary matches the browser state.

## Milestone 7 — Browser DAW showpiece (stretch)

**Goal:** Let the agent make a short boss theme in a real browser music editor.

1. Test editor access and a repeatable 8-bar composition workflow before integrating it.
2. Have the agent create or modify a track, export it, and verify the downloaded audio plays.
3. Use the track in the battle while retaining the procedural Tone.js score as the reliable fallback.

BeepBox is a lightweight choice; BandLab is a fuller DAW if the team's account has Studio access. This step should not block the working quest loop.

## Milestone 8 — Demo hardening

1. Seed a dedicated inbox and calendar with three coherent messages and known expected outcomes.
2. Rehearse the entire run from a clean browser session. Capture a backup recording of a successful run.
3. Add a visible progress timeline and a single recovery button for a stalled browser step.
4. Check laptop audio, screen scaling, login state, and network before presenting.
5. Track four demo metrics: missions grounded in sources, browser actions attempted, actions verified, and recovery from one deliberate obstacle.

**Done when:** the team can run the complete story twice in a row, including one controlled failure, without manual repair.

## Proposed architecture

```text
Next.js UI (source picker, review, battle, activity feed)
    ↓ quest/action requests
Python FastAPI service (state machine, action ledger, model adapter)
    ↓                         ↓
Qwen3.6-27B inference         Browser Use + Playwright
                              ↓
                       test inbox / calendar / DAW
    ↓
SQLite (quests, mission snapshots, action evidence)
```

Use a hosted endpoint for the open-weight model during the hackathon unless a suitable GPU is already available. Keep the model endpoint configurable; do not tie quest logic to one inference provider.

## Suggested team split

- **UI/game:** source picker, mission review, Phaser battle, Tone.js score.
- **Browser:** signed-in profile, read actions, draft/calendar actions, screenshots and verification.
- **Agent/data:** schemas, extraction, state machine, action ledger, demo fixtures.

Agree on the `mission` and `action` schemas before splitting work. Integrate a thin end-to-end path early, then add polish.
