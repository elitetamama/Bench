# Bench

A small shelf of the projects David Erthal actually uses.

David Erthal keeps a shelf of projects he uses and learns from: Cursor, [Odysseus](https://github.com/odysseus-dev/odysseus), [Flipper Zero](https://github.com/flipperdevices/flipperzero-firmware), and [Sesame](https://github.com/dorianborian/sesame-robot), with room to add the next thing. Notes typed into the page stay in the browser. Nothing is uploaded.

![Bench, with the Sesame note open](docs/bench.png)

## Run it

```bash
npm install
npm run dev
```

Open the URL Next prints. `npm test` checks the shelf logic. `npm run lint` checks the code.

## Where things live

| File | What it is |
| --- | --- |
| `src/lib/shelf.ts` | The writeups, plus the rules for adding a project |
| `public/shelf/` | Photos for the notes. Odysseus is waiting on a picture of David's own instance. |
| `src/components/bench.tsx` | The page: open a row, filter, type a margin note |
| `src/components/add-project-dialog.tsx` | The form for a project of your own |
| `profile/README.md` | The text for a GitHub profile page |
| `PUBLISHING.md` | How to push an update to GitHub |

Edit the words in `src/lib/shelf.ts` before you publish. If a sentence is not something you would say out loud, change it.

## Publishing

See [PUBLISHING.md](PUBLISHING.md). Short version: push this repository to [github.com/elitetamama/bench](https://github.com/elitetamama/bench), pin it, and put `profile/README.md` in a repository named `elitetamama`.
