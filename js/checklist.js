const CHECKLIST = [
  {
    id: "weapon",
    title: "The weapon",
    hint: "What did the damage?",
    options: [
      { id: "hatchet", label: "Hatchet" },
      { id: "candlestick", label: "Candlestick" },
      { id: "opener", label: "Letter opener" },
      { id: "revolver", label: "Revolver" },
      { id: "poison", label: "Poison" }
    ]
  },
  {
    id: "room",
    title: "The room",
    hint: "Where did it happen?",
    options: [
      { id: "study", label: "Study" },
      { id: "parlor", label: "Parlor" },
      { id: "cellar", label: "Cellar" },
      { id: "kitchen", label: "Kitchen" },
      { id: "bedroom", label: "Upstairs bedroom" }
    ]
  },
  {
    id: "time",
    title: "The time",
    hint: "When did it happen?",
    options: [
      { id: "early", label: "Before 10:45" },
      { id: "eleven", label: "11:00 to 11:10" },
      { id: "late", label: "After 11:15" }
    ]
  },
  {
    id: "entry",
    title: "The way in",
    hint: "How did they get to him?",
    options: [
      { id: "front", label: "Front door" },
      { id: "kitchen", label: "Kitchen door" },
      { id: "cellar", label: "Cellar door" },
      { id: "stairs", label: "Back stairs" }
    ]
  },
  {
    id: "alibi",
    title: "The weakest alibi",
    hint: "Whose story is thinnest?",
    options: suspects.map((suspect) => ({ id: suspect.id, label: suspect.name }))
  },
  {
    id: "killer",
    title: "The killer",
    hint: "Who did it?",
    options: suspects.map((suspect) => ({ id: suspect.id, label: suspect.name }))
  },
  {
    id: "motive",
    title: "The motive",
    hint: "Why now?",
    options: [
      { id: "money", label: "Money" },
      { id: "revenge", label: "Revenge" },
      { id: "exposure", label: "Fear of exposure" },
      { id: "inheritance", label: "Inheritance" }
    ]
  }
];
