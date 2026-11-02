// Each suspect is an object. "answers" holds their recordings,
// grouped by category. A category can have more than one recording.
//
// "file" is the path to the audio. "sfx" is an optional sound effect that
// plays together with the answer (null if there is none).
//
// The files do not exist yet. We will record them and fill them in later.

const suspects = [
  {
    id: "suspect1",
    name: "Suspect 1",            // TODO: real name
    answers: {
      location:      [{ file: "audio/suspect1/location-1.mp3", sfx: null }],
      timeline:      [{ file: "audio/suspect1/timeline-1.mp3", sfx: null }],
      relationships: [{ file: "audio/suspect1/relationships-1.mp3", sfx: null }],
      actions:       [{ file: "audio/suspect1/actions-1.mp3", sfx: "audio/sfx/glass-break.mp3" }],
      observations:  [{ file: "audio/suspect1/observations-1.mp3", sfx: null }],
      alibi:         [{ file: "audio/suspect1/alibi-1.mp3", sfx: null }]
    }
  },
  {
    id: "suspect2",
    name: "Suspect 2",            // TODO: real name
    answers: {
      location:      [{ file: "audio/suspect2/location-1.mp3", sfx: null }],
      timeline:      [{ file: "audio/suspect2/timeline-1.mp3", sfx: null }],
      relationships: [{ file: "audio/suspect2/relationships-1.mp3", sfx: "audio/sfx/laughter.mp3" }],
      actions:       [{ file: "audio/suspect2/actions-1.mp3", sfx: null }],
      observations:  [{ file: "audio/suspect2/observations-1.mp3", sfx: "audio/sfx/car-crash.mp3" }],
      alibi:         [{ file: "audio/suspect2/alibi-1.mp3", sfx: null }]
    }
  },
  {
    id: "suspect3",
    name: "Suspect 3",            // TODO: real name
    answers: {
      location:      [{ file: "audio/suspect3/location-1.mp3", sfx: null }],
      timeline:      [{ file: "audio/suspect3/timeline-1.mp3", sfx: null }],
      relationships: [{ file: "audio/suspect3/relationships-1.mp3", sfx: null }],
      actions:       [{ file: "audio/suspect3/actions-1.mp3", sfx: "audio/sfx/knife.mp3" }],
      observations:  [{ file: "audio/suspect3/observations-1.mp3", sfx: null }],
      alibi:         [{ file: "audio/suspect3/alibi-1.mp3", sfx: null }]
    }
  }
];

// Returns one recording for a suspect and a category.
// If the category has several recordings, it picks one at random.
function getAnswer(suspect, categoryId) {
  const options = suspect.answers[categoryId];
  if (!options || options.length === 0) return null;
  return options[Math.floor(Math.random() * options.length)];
}
