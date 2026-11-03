const CaseFile = (() => {
  const CLUE_COUNT = 11;

  const root = document.getElementById("casefile");
  const list = document.getElementById("clues-list");
  const count = document.getElementById("clues-count");
  const replayButton = root.querySelector("[data-action='replay']");
  const suspectsButton = root.querySelector("[data-action='suspects']");

  const unlocked = new Set();
  let narrated = false;

  function renderTags() {
    for (let index = 1; index <= CLUE_COUNT; index += 1) {
      const item = document.createElement("li");
      item.className = "tag";
      item.dataset.clue = String(index);
      item.innerHTML =
        '<button class="tag__button" type="button" aria-label="Locked evidence ' + index + '">' +
        '<svg class="tag__lock" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2.4"/><rect x="4" y="11" width="16" height="11" fill="currentColor"/></svg>' +
        '<span class="tag__number">No. ' + index + '</span></button>';
      list.appendChild(item);
    }
  }

  function updateCount() {
    count.textContent = unlocked.size + " of " + CLUE_COUNT + " found";
  }

  function unlock(index, { title, text }) {
    const item = list.querySelector('[data-clue="' + index + '"]');
    if (!item || unlocked.has(index)) return;
    unlocked.add(index);
    item.classList.add("is-open");
    item.innerHTML =
      '<p class="tag__title"></p><p class="tag__text"></p>';
    item.querySelector(".tag__title").textContent = title;
    item.querySelector(".tag__text").textContent = text;
    updateCount();
  }

  function rattle(item) {
    item.classList.remove("is-rattling");
    void item.offsetWidth;
    item.classList.add("is-rattling");
    GameAudio.play("rattle", { volume: 0.7 });
  }

  function enter() {
    root.closest(".screen").scrollTop = 0;
    root.classList.add("is-entered");
    if (!narrated) {
      narrated = true;
      GameAudio.play("intro");
    }
  }

  function leave() {
    GameAudio.fadeOut("intro", 600);
    root.classList.remove("is-entered");
  }

  list.addEventListener("click", (event) => {
    const item = event.target.closest(".tag");
    if (item && !item.classList.contains("is-open")) rattle(item);
  });

  replayButton.addEventListener("click", () => GameAudio.play("intro"));

  suspectsButton.addEventListener("click", () => {
    suspectsButton.classList.remove("is-rattling");
    void suspectsButton.offsetWidth;
    suspectsButton.classList.add("is-rattling");
    GameAudio.play("rattle", { volume: 0.7 });
  });

  renderTags();
  updateCount();

  return { enter, leave, unlock };
})();
