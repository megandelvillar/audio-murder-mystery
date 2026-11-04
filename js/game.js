const Game = (() => {
  const heard = new Set();
  const found = new Set();
  let left = QUESTION_BUDGET;

  const id = (suspect, question) => suspect + ":" + question;

  function ask(suspect, question) {
    if (heard.has(id(suspect, question))) return true;
    if (left === 0) return false;
    left -= 1;
    heard.add(id(suspect, question));
    return true;
  }

  function collectClues(suspect, question) {
    const fresh = CLUES.filter((clue) =>
      !found.has(clue.slot) && clue.triggers.some(([who, what]) => who === suspect && what === question)
    );
    fresh.forEach((clue) => found.add(clue.slot));
    return fresh;
  }

  function reset() {
    heard.clear();
    found.clear();
    left = QUESTION_BUDGET;
  }

  return {
    ask,
    reset,
    collectClues,
    hasHeard: (suspect, question) => heard.has(id(suspect, question)),
    questionsLeft: () => left,
    foundCount: () => found.size,
    isFound: (slot) => found.has(slot)
  };
})();
