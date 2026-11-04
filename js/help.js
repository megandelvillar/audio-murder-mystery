const Help = (() => {
  const STEPS = [
    ["The goal", "Somebody killed Armand Ackroyd. Find out who did it, why, and how they got in."],
    ["The files", "Listen to Constable Doyle's tape, then read each suspect's file to learn who they are."],
    ["The interviews", "Ask a suspect questions. You only get " + QUESTION_BUDGET + " in total, so choose wisely. Answers you have heard can be replayed for free."],
    ["The evidence", "The right question to the right person unlocks evidence. Press Evidence at the bottom to see all you have found."],
    ["The notebook", "Press Notebook for your own notes. Click a name once to rule it out, twice to mark it as likely."],
    ["The accusation", "Press Sum up the case. Choose the killer, the motive and the way in, then file your report."]
  ];

  const toggle = document.getElementById("help-toggle");
  const sheet = document.getElementById("help");
  const lists = document.querySelectorAll("[data-help-steps]");

  function render() {
    lists.forEach((list) => {
      STEPS.forEach(([name, text], index) => {
        const item = document.createElement("li");
        item.className = "step";
        item.innerHTML = '<span class="step__number"></span><h3 class="step__name"></h3><p class="step__text"></p>';
        item.querySelector(".step__number").textContent = String(index + 1);
        item.querySelector(".step__name").textContent = name;
        item.querySelector(".step__text").textContent = text;
        list.appendChild(item);
      });
    });
  }

  function open() {
    Notebook.close();
    Evidence.close();
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
    GameAudio.play("paper", { volume: 0.6 });
    sheet.querySelector(".help__close").focus();
  }

  function close() {
    if (sheet.hidden) return;
    sheet.classList.remove("is-open");
    sheet.hidden = true;
    GameAudio.play("paper", { volume: 0.4 });
    toggle.focus();
  }

  function show(visible) {
    toggle.hidden = !visible;
    if (!visible) close();
  }

  toggle.addEventListener("click", open);

  sheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='close']")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) {
      event.stopImmediatePropagation();
      close();
    }
  });

  render();

  return { show, close };
})();
