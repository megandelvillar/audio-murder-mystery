const Notebook = (() => {
  const STATES = ["", "out", "likely"];
  const STATE_LABELS = { "": "not marked", out: "ruled out", likely: "likely" };

  const toggle = document.getElementById("notebook-toggle");
  const sheet = document.getElementById("notebook");
  const grid = document.getElementById("notebook-grid");
  const scribbles = document.getElementById("notebook-scribbles");

  const marks = new Map();

  function markKey(category, option) {
    return category + ":" + option;
  }

  function describe(row, category, option, state) {
    row.setAttribute("aria-label", category.title + ": " + option.label + ", " + STATE_LABELS[state]);
  }

  function render() {
    CHECKLIST.forEach((category) => {
      const card = document.createElement("section");
      card.className = "page";
      card.innerHTML = '<h3 class="page__title"></h3><p class="page__hint"></p><ul class="page__rows"></ul>';
      card.querySelector(".page__title").textContent = category.title;
      card.querySelector(".page__hint").textContent = category.hint;

      const rows = card.querySelector(".page__rows");
      category.options.forEach((option) => {
        const item = document.createElement("li");
        item.innerHTML = '<button class="row" type="button"><span class="row__box" aria-hidden="true"></span><span class="row__label"></span></button>';
        const row = item.querySelector(".row");
        row.dataset.category = category.id;
        row.dataset.option = option.id;
        row.dataset.state = "";
        item.querySelector(".row__label").textContent = option.label;
        describe(row, category, option, "");
        rows.appendChild(item);
      });
      grid.appendChild(card);
    });
  }

  function cycle(row) {
    const category = CHECKLIST.find((entry) => entry.id === row.dataset.category);
    const option = category.options.find((entry) => entry.id === row.dataset.option);
    const next = STATES[(STATES.indexOf(row.dataset.state) + 1) % STATES.length];

    row.dataset.state = next;
    describe(row, category, option, next);
    marks.set(markKey(category.id, option.id), next);
    GameAudio.play("paper", { volume: 0.35 });
  }

  function clear() {
    marks.clear();
    grid.querySelectorAll(".row").forEach((row) => {
      const category = CHECKLIST.find((entry) => entry.id === row.dataset.category);
      const option = category.options.find((entry) => entry.id === row.dataset.option);
      row.dataset.state = "";
      describe(row, category, option, "");
    });
    scribbles.value = "";
  }

  function open() {
    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
    GameAudio.play("paper", { volume: 0.6 });
    sheet.querySelector(".notebook__close").focus();
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
    if (event.target.closest("[data-action='clear']")) clear();
  });

  grid.addEventListener("click", (event) => {
    const row = event.target.closest(".row");
    if (row) cycle(row);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sheet.hidden) {
      event.stopImmediatePropagation();
      close();
    }
  });

  render();

  return {
    show,
    close,
    reset: clear,
    state: (category, option) => marks.get(markKey(category, option)) || ""
  };
})();
