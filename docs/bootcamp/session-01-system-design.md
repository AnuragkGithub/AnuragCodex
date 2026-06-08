# Session 1: System Design Fundamentals

## Prompt

Design the first version of a notes app and define a proof trail for the public profile.

## User goal

The user wants a fast way to create, pin, and remove notes.

## Data model

- `id`
- `title`
- `body`
- `pinned`
- `createdAt`

## Design decisions

- Start with a browser-only version so the foundation is simple.
- Use `localStorage` so the first version persists between refreshes.
- Keep the backend as a future step instead of adding unnecessary complexity today.

## Future growth

- search notes
- edit notes
- move to a backend API
- store notes in a database
- sync across devices

## Failure cases to consider later

- localStorage becomes full
- users refresh while editing
- duplicate notes from repeated submissions
- data loss if the browser storage is cleared

## Proof to capture

- what was built
- what tradeoff was chosen
- what data was stored
- what was verified after refresh
