const Evidence = (() => {
  const toggle = document.getElementById("evidence-toggle");
  const sheet = document.getElementById("evidence");
  const list = document.getElementById("evidence-list");
  const count = document.getElementById("evidence-count");

  function refresh() {
    const found = CLUES.filter((clue) => Game.isFound(clue.slot)).length;
    toggle.textContent = "Evidence " + found + "/" + CLUES.length;
    count.textContent = found + " of " + CLUES.length + " pieces found";
  }

  function render() {
    list.replaceChildren();
    CLUES.forEach((clue) => {
      const found = Game.isFound(clue.slot);
      const item = document.createElement("li");
      item.className = "proof" + (found ? "" : " is-locked");
      item.innerHTML = '<span class="proof__number"></span><h3 class="proof__title"></h3><p class="proof__text"></p>';
      item.querySelector(".proof__number").textContent = "No. " + clue.slot;
      item.querySelector(".proof__title").textContent = found ? clue.title : "Not found yet";
      item.querySelector(".proof__text").textContent = found
        ? clue.text
        : "Ask the right question to the right person to open this one.";
      list.appendChild(item);
    });
  }

  function open() {
    Notebook.close();
    render();
    refresh();
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
    GameAudio.play("paper", { volume: 0.6 });
    sheet.querySelector(".proofs__close").focus();
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

  refresh();

  return { show, close, refresh };
})();
