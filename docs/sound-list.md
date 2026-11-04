# Sound list

Files the game expects in `audio/sfx/` and `audio/narrator/`. Until they exist, the game runs silently and the browser console shows 404 errors for the missing files.

| File | Where it plays | What it should sound like | Length |
|------|----------------|---------------------------|--------|
| `scream.mp3` | Opening, right after the first black screen | A single scream, distant and sharp | 1 to 2 s |
| `glass-break.mp3` | About 1.2 s after the scream | Glass breaking, a window shattering | 1 to 2 s |
| `tension-music.mp3` | Loops quietly under the whole game, quietest in the interviews | Tense, dark background music | 2 to 3 min |
| `phone-ring.mp3` | When the call note appears | Old telephone ring | 2 to 3 s |
| `paper-slide.mp3` | When an answer is chosen, and when going back | Paper sliding on a desk | under 1 s |
| `chain-rattle.mp3` | When a locked tape is clicked | Short metal chain rattle | under 1 s |
| `tape-click.mp3` | When Tape No. 1 is opened | Cassette player button click | under 1 s |
| `narrator/intro.mp3` | When the case file opens, and on Play recording | Constable Doyle reading the opening statement, tape hiss and a click underneath | 25 to 35 s |

## Rules

- Format: `.mp3`, mono or stereo, under 500 KB per file where possible.
- Normalize volume so the scream and the glass are the loudest sounds in the game.
- Keep the exact file names. They are referenced in `js/audio.js`.
- Timing of the scream and the glass is set in `playIntro()` in `js/main.js`.