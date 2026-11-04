const QUESTION_BUDGET = 6;

const suspects = [
  {
    id: "scarlett",
    name: "Scarlett Ackroyd",
    age: 28,
    role: "The daughter",
    facts: [
      ["Relation", "Armand's daughter. Her mother died when she was nine."],
      ["Background", "Painter. Works in the carriage house behind the main house."],
      ["On record", "Told her father at breakfast: \"I could kill you.\""]
    ],
    note: "Quick tongue. Funny when she is frightened."
  },
  {
    id: "verity",
    name: "Verity Ackroyd",
    age: 46,
    role: "The wife",
    facts: [
      ["Relation", "Armand's second wife."],
      ["Background", "Former stage actress."],
      ["On record", "Confined to her bedroom since Tuesday with an illness."]
    ],
    note: "Gentle. Beautifully spoken. Calls everyone darling."
  },
  {
    id: "julian",
    name: "Julian Paton",
    age: 23,
    role: "The nephew",
    facts: [
      ["Relation", "Armand's nephew. Raised by him after Julian's mother died."],
      ["Background", "Lives in the house, on his uncle's money."],
      ["On record", "Was in the house when the body was found."]
    ],
    note: "Charming. Talks fast when he is nervous."
  },
  {
    id: "paloma",
    name: "Paloma Rogers",
    age: 60,
    role: "The housekeeper",
    facts: [
      ["Relation", "Housekeeper to the Ackroyd family."],
      ["Background", "Thirty-four years in the house."],
      ["On record", "Found the body at 11:15 and screamed."]
    ],
    note: "Warm and tired. Sees everything. Nobody ever asks her."
  },
  {
    id: "dante",
    name: "Dante Blunt",
    age: 52,
    role: "The partner",
    facts: [
      ["Relation", "Armand's business partner for thirty-one years."],
      ["Background", "Former army reservist. Co-owner of the mill."],
      ["On record", "Holds one of the only two keys to the cellar."]
    ],
    note: "Big voice. Laughs a beat too late."
  }
];
