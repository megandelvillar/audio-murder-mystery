const CLUES = [
  {
    slot: 1,
    title: "The handkerchief",
    text: "A handkerchief lay over Armand's face until the constable lifted it. Nobody from the family was let into the study.",
    triggers: [["paloma", "saw"], ["julian", "saw"]]
  },
  {
    slot: 2,
    title: "Verity's picture",
    text: "Verity says she saw nothing. Then she described the handkerchief over Armand's face.",
    triggers: [["verity", "saw"]]
  },
  {
    slot: 3,
    title: "The back stairs",
    text: "At about eight past eleven someone went up the back stairs. The third step creaked and a door clicked upstairs. Nobody answered Julian.",
    triggers: [["julian", "heard"]]
  },
  {
    slot: 4,
    title: "A laugh upstairs",
    text: "At five past eleven Dante rang the bell. The door was bolted. He heard a woman laugh once, from an upstairs window.",
    triggers: [["dante", "secret"]]
  },
  {
    slot: 5,
    title: "The yard",
    text: "From the yard Paloma could see the barn door, open all morning. Scarlett never crossed it. The neighbor and the postman saw Paloma outside.",
    triggers: [["paloma", "alibi"]]
  },
  {
    slot: 6,
    title: "Ohio",
    text: "On Wednesday night Paloma overheard Armand say he knew about Ohio, and that on Monday he would go to the police.",
    triggers: [["paloma", "secret"]]
  },
  {
    slot: 7,
    title: "The tonic",
    text: "Verity says she stopped taking her tonic on Tuesday. She says the migraines are real.",
    triggers: [["verity", "secret"]]
  },
  {
    slot: 8,
    title: "A blue sedan",
    text: "At about five to eleven Scarlett saw a dark blue sedan parked at the corner, engine off. She says it was Dante's.",
    triggers: [["scarlett", "secret"]]
  },
  {
    slot: 9,
    title: "The bank",
    text: "Julian lied about the bank. He owes a bookmaker named Eddie nine thousand dollars.",
    triggers: [["julian", "secret"]]
  },
  {
    slot: 10,
    title: "The foreman",
    text: "Dante insists he drove straight to the mill. His foreman, Briggs, would know when he really arrived.",
    triggers: [["dante", "location"], ["dante", "alibi"]]
  },
  {
    slot: 11,
    title: "The lawyer's call",
    text: "At twenty past ten Armand phoned his lawyer, Mr. Hastings: \"Monday, nine o'clock. The will, and one more matter for the police.\"",
    triggers: [["paloma", "lastseen"]]
  }
];
