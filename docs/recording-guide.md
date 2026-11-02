# Recording guide

## File rules
- Format: `.mp3`
- Names: `category-number.mp3`, all lowercase, no spaces
  (example: `audio/suspect2/alibi-1.mp3`)
- Sound effects go in `audio/sfx/` with a short name (`glass-break.mp3`)
- Keep every answer short, about 5 to 20 seconds
- Record in a quiet room, same microphone for the same suspect

## Per suspect checklist
Each suspect needs about 10 recordings, at least one per category.

| Category      | Suspect 1 | Suspect 2 | Suspect 3 |
|---------------|-----------|-----------|-----------|
| location      | [ ]       | [ ]       | [ ]       |
| timeline      | [ ]       | [ ]       | [ ]       |
| relationships | [ ]       | [ ]       | [ ]       |
| actions       | [ ]       | [ ]       | [ ]       |
| observations  | [ ]       | [ ]       | [ ]       |
| alibi         | [ ]       | [ ]       | [ ]       |

The extra recordings (to reach about 10) can be a second answer in any category.
When a category has two files, the code picks one at random.

## Sound effects to get
Placeholders already in the code: `glass-break`, `laughter`, `car-crash`, `knife`.
Record them ourselves when we can, otherwise use a free library.

## When we add a new recording
1. Put the file in the right folder.
2. Add it to that suspect in `js/suspects.js`.
3. If it is not our own recording, add it to `audio/CREDITS.md`.

## Next steps
- Decide who the murderer is and what really happened.
- Write the script for each suspect (who lies, who tells the truth, who is confusing).
- Record the audio.
- Give the suspects real names.
