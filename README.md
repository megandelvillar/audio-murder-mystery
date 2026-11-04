# Audio Murder Mystery

An interactive, sound-driven murder mystery. You are the investigator, and you
have to figure out who committed the murder by interrogating three suspects.

There is no fixed storyline so you decide who to question and what to ask, and the
story slowly comes together through the voice recordings you hear. Sound is the
main way the story is told: voices and sound effects (breaking glass, a knife,
a car crash, laughter) that match what the suspect is remembering.

## How it will work

- 5 suspects, each one is an object in the code.
- Each suspect has 10 pre-recorded audio answers.
- Every suspect answers the same ten questions, with one recording each.
- The investigator has a budget of six questions across all suspects.
- Some answers unlock locked evidence in the case file.
- Suspects can only answer with the recordings they have. No new answers.

## Folder structure

```
audio-murder-mystery/
├── README.md        this file
├── docs/            project notes and ideas
├── audio/           all the sound files
│   ├── scarlett/    recordings for Scarlett Ackroyd
│   ├── verity/      recordings for Verity Ackroyd
│   ├── julian/      recordings for Julian Paton
│   ├── paloma/      recordings for Paloma Rogers
│   ├── dante/       recordings for Dante Blunt
│   ├── narrator/    Constable Doyle's recordings
│   └── sfx/         sound effects (recorded by us or from free libraries)
├── images/          character drawings (idle, talking, portrait)
│   └── characters/
├── js/              the code
└── css/             the styling
```

## Audio sources

Most audio will be recorded by us. Some sound effects will come from free sound
libraries. Every file that is not ours must be listed in `audio/CREDITS.md`
with where it came from.
