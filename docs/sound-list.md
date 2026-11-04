# Sound list

Files the game expects in `audio/sfx/` and `audio/narrator/`. Until they exist, the game runs silently and the browser console shows 404 errors for the missing files.

| File | Where it plays | What it should sound like | Length |
|------|----------------|---------------------------|--------|
| `scream.mp3` | Opening, right after the first black screen | A single scream, distant and sharp | 1 to 2 s |
| `glass-break.mp3` | About 1.2 s after the scream | Glass breaking, a window shattering | 1 to 2 s |
| `room-tone.mp3` | Loops quietly under the title and case selection | Low empty room, faint hum | 20 to 40 s, loopable |
| `phone-ring.mp3` | When the call note appears | Old telephone ring | 2 to 3 s |
| `paper-slide.mp3` | When an answer is chosen, and when going back | Paper sliding on a desk | under 1 s |
| `chain-rattle.mp3` | When a locked tape is clicked | Short metal chain rattle | under 1 s |
| `tape-click.mp3` | When Tape No. 1 is opened | Cassette player button click | under 1 s |
| `narrator/intro.mp3` | When the case file opens, and on Play recording | Constable Doyle reading the opening statement, tape hiss and a click underneath | 25 to 35 s |
| `narrator/ending-solved.mp3` | Ending: the report is fully correct | Constable Doyle, tired and quietly satisfied | 20 to 30 s |
| `narrator/ending-weak.mp3` | Ending: right killer, wrong motive or way in | Constable Doyle, flat and a little bitter | 15 to 25 s |
| `narrator/ending-wrong.mp3` | Ending: the wrong person is named | Constable Doyle, uneasy and low | 15 to 25 s |
| `narrator/ending-unsolved.mp3` | Ending: nothing on the report is right | Constable Doyle, tired, almost whispering | 15 to 25 s |

## Rules

- Format: `.mp3`, mono or stereo, under 500 KB per file where possible.
- Normalize volume so the scream and the glass are the loudest sounds in the game.
- Keep the exact file names. They are referenced in `js/audio.js`.
- Timing of the scream and the glass is set in `playIntro()` in `js/main.js`.