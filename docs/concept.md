# Concept notes

## Idea
A sound-driven murder mystery. The user is an investigator who has to find out
who the murderer is among three suspects.

## Core idea
The user is responsible for uncovering the story. There is no fixed order of
events. The story appears through the questions the user chooses and the audio
answers they get. Users find clues, contradictions, and maybe misleading
information through recorded voices instead of reading text.

## Question categories
| Category      | The question                                   |
|---------------|------------------------------------------------|
| location      | Where were you?                                |
| timeline      | What happened and when?                        |
| relationships | What was your relationship with the victim?    |
| actions       | What did you do that night?                    |
| observations  | What did you see or hear?                      |
| alibi         | Can anyone confirm where you were?             |

## Rules of the system
- 3 suspects, each one is its own object in the code.
- About 10 recordings per suspect.
- The user drives the investigation (who to ask, what to ask).
- Suspects only answer with the recordings they already have.

## Sound effects
Some answers have a sound effect that matches what the suspect is remembering,
for example glass breaking, a knife, a car crash, or laughter. We record most of
these ourselves and take some from free sound libraries.
