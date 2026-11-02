// The kinds of questions the investigator can ask.
// The "id" is what each suspect's recordings are grouped by.
const CATEGORIES = [
  { id: "location",      question: "Where were you?" },
  { id: "timeline",      question: "What happened and when?" },
  { id: "relationships", question: "What was your relationship with the victim?" },
  { id: "actions",       question: "What did you do that night?" },
  { id: "observations",  question: "What did you see or hear?" },
  { id: "alibi",         question: "Can anyone confirm where you were?" }
];
