const Ending = (() => {
  const ENDINGS = {
    solved: {
      title: "Case closed",
      caption: "Right person, right reason, right way in.",
      audio: "audio/narrator/ending-solved.mp3"
    },
    weak: {
      title: "Right person, weak case",
      caption: "You named the killer, but the story did not hold together.",
      audio: "audio/narrator/ending-weak.mp3"
    },
    wrong: {
      title: "The wrong person",
      caption: "An innocent name went on the report. The killer is still out there.",
      audio: "audio/narrator/ending-wrong.mp3"
    },
    unsolved: {
      title: "Unsolved",
      caption: "Nothing on your report held up. The file goes in the drawer.",
      audio: "audio/narrator/ending-unsolved.mp3"
    }
  };

  const PARTS = [
    ["killer", "The killer"],
    ["motive", "The motive"],
    ["entry", "The way in"]
  ];

  const root = document.getElementById("ending");
  const stamp = document.getElementById("ending-stamp");
  const title = document.getElementById("ending-title");
  const caption = document.getElementById("ending-caption");
  const rows = document.getElementById("ending-rows");
  const stats = document.getElementById("ending-stats");
  const replayButton = root.querySelector("[data-action='replay-ending']");

  let current = null;

  function labelFor(part, id) {
    const category = CHECKLIST.find((entry) => entry.id === part);
    return category.options.find((option) => option.id === id).label;
  }

  function play() {
    if (current) GameAudio.speak(current.audio, () => {});
  }

  function show(report) {
    const verdict = Verdict.check(report);
    current = ENDINGS[verdict.ending];
    root.dataset.ending = verdict.ending;

    stamp.textContent = verdict.ending === "solved" ? "Closed" : verdict.ending === "unsolved" ? "Cold" : "Doubtful";
    title.textContent = current.title;
    caption.textContent = current.caption;

    rows.replaceChildren();
    PARTS.forEach(([part, name]) => {
      const right = verdict.result[part];
      const item = document.createElement("li");
      item.className = "verdict__row " + (right ? "is-right" : "is-wrong");
      item.innerHTML =
        '<span class="verdict__mark" aria-hidden="true"></span>' +
        '<span class="verdict__part"></span>' +
        '<span class="verdict__pick"></span>' +
        '<span class="verdict__result"></span>';
      item.querySelector(".verdict__part").textContent = name;
      item.querySelector(".verdict__pick").textContent = labelFor(part, report[part]);
      item.querySelector(".verdict__result").textContent = right ? "Correct" : "Not quite";
      rows.appendChild(item);
    });

    stats.textContent =
      "Questions used: " + (QUESTION_BUDGET - Game.questionsLeft()) + " of " + QUESTION_BUDGET +
      ". Evidence found: " + Game.foundCount() + " of " + CLUES.length + ".";

    root.classList.add("is-entered");
    play();
  }

  function stop() {
    GameAudio.stopVoice();
    root.classList.remove("is-entered");
  }

  replayButton.addEventListener("click", play);

  return { show, stop };
})();
