const Verdict = (() => {
  const SALT = "tape-1";

  // Answers are stored as hashes so the report can be checked without spelling them out in the source.
  const ANSWERS = { killer: 7569592009482133, motive: 5290416009275886, entry: 250787862228064 };

  function hash(text) {
    let first = 0xdeadbeef;
    let second = 0x41c6ce57;
    for (let index = 0; index < text.length; index += 1) {
      const code = text.charCodeAt(index);
      first = Math.imul(first ^ code, 2654435761);
      second = Math.imul(second ^ code, 1597334677);
    }
    first = Math.imul(first ^ (first >>> 16), 2246822507) ^ Math.imul(second ^ (second >>> 13), 3266489909);
    second = Math.imul(second ^ (second >>> 16), 2246822507) ^ Math.imul(first ^ (first >>> 13), 3266489909);
    return 4294967296 * (second & 2097151) + (first >>> 0);
  }

  function pickEnding(result, correct) {
    if (correct === 3) return "solved";
    if (correct === 0) return "unsolved";
    return result.killer ? "weak" : "wrong";
  }

  function check(report) {
    const result = {};
    let correct = 0;
    Object.keys(ANSWERS).forEach((part) => {
      result[part] = hash(SALT + ":" + part + ":" + report[part]) === ANSWERS[part];
      if (result[part]) correct += 1;
    });
    return { result, correct, ending: pickEnding(result, correct) };
  }

  return { check };
})();
