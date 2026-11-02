# Audio Murder Mystery

An interactive, sound-driven murder mystery. You are the investigator, and you
have to figure out who committed the murder by interrogating three suspects.

There is no fixed storyline. You decide who to question and what to ask, and the
story slowly comes together through the voice recordings you hear. Sound is the
main way the story is told: voices, and sound effects (breaking glass, a knife,
a car crash, laughter) that match what the suspect is remembering.

> Status: just started. This is the first hour of the project, so most things
> are placeholders.

## How it will work

- 3 suspects, each one is an object in the code.
- Each suspect has around 10 pre-recorded audio answers.
- The answers are grouped into categories (location, timeline, relationship,
  actions, observations, alibi).
- The user picks a suspect and a question. The code finds the matching category
  and plays one of the recordings.
- Suspects can only answer with the recordings they have. No new answers.

## Folder structure

```
audio-murder-mystery/
├── README.md        this file
├── docs/            project notes and ideas
├── audio/           all the sound files
│   ├── suspect1/    recordings for suspect 1
│   ├── suspect2/    recordings for suspect 2
│   ├── suspect3/    recordings for suspect 3
│   └── sfx/         sound effects (recorded by us or from free libraries)
├── js/              the code
└── css/             the styling
```

## Audio sources

Most audio will be recorded by us. Some sound effects will come from free sound
libraries. Every file that is not ours must be listed in `audio/CREDITS.md`
with where it came from.
