const SuspectFiles = (() => {
  const IMAGE_PATH = "images/characters/";

  const root = document.getElementById("suspects");
  const list = document.getElementById("files");
  const budget = document.getElementById("suspects-budget");
  const interviewButton = root.querySelector("[data-action='interview']");

  const sheet = document.getElementById("sheet");
  const sheetPhoto = document.getElementById("sheet-photo");
  const sheetRole = document.getElementById("sheet-role");
  const sheetName = document.getElementById("sheet-name");
  const sheetAge = document.getElementById("sheet-age");
  const sheetFacts = document.getElementById("sheet-facts");
  const sheetNote = document.getElementById("sheet-note");
  const sheetClose = sheet.querySelector(".sheet__close");

  const reviewed = new Set();
  let opener = null;

  // Draws a drawing from images/characters, or a silhouette until the file exists.
  function fillPhoto(container, suspect, kind) {
    container.innerHTML =
      '<svg class="photo__blank" viewBox="0 0 100 100" aria-hidden="true">' +
      '<rect width="100" height="100" fill="url(#hatch-bone)" opacity=".12"/>' +
      '<circle cx="50" cy="38" r="17" fill="#e9e1cf" opacity=".16"/>' +
      '<path d="M16 100 C16 70 32 60 50 60 C68 60 84 70 84 100 Z" fill="#e9e1cf" opacity=".16"/>' +
      "</svg>";
    const image = new Image();
    image.className = "photo__image";
    image.alt = suspect.name + ", " + suspect.role.toLowerCase();
    image.addEventListener("load", () => {
      container.replaceChildren(image);
    });
    image.src = IMAGE_PATH + suspect.id + "-" + kind + ".png";
  }

  function renderCards() {
    suspects.forEach((suspect, index) => {
      const item = document.createElement("li");
      item.className = "file";
      item.style.setProperty("--i", String(index));
      item.dataset.id = suspect.id;
      item.innerHTML =
        '<button class="file__button" type="button">' +
        '<span class="file__tab">No. ' + (index + 1) + "</span>" +
        '<span class="file__photo"></span>' +
        '<span class="file__name"></span>' +
        '<span class="file__role"></span>' +
        '<span class="file__stamp" aria-hidden="true">Read</span>' +
        "</button>";
      item.querySelector(".file__name").textContent = suspect.name;
      item.querySelector(".file__role").textContent = suspect.role + ", " + suspect.age;
      fillPhoto(item.querySelector(".file__photo"), suspect, "portrait");
      list.appendChild(item);
    });
  }

  function updateBudget() {
    budget.textContent = QUESTION_BUDGET + " questions left";
  }

  function openSheet(suspect, card) {
    opener = card;
    sheetRole.textContent = suspect.role;
    sheetName.textContent = suspect.name;
    sheetAge.textContent = "Age " + suspect.age;
    sheetNote.textContent = suspect.note;
    sheetFacts.innerHTML = "";
    suspect.facts.forEach(([label, text]) => {
      const term = document.createElement("dt");
      const detail = document.createElement("dd");
      term.textContent = label;
      detail.textContent = text;
      sheetFacts.append(term, detail);
    });
    fillPhoto(sheetPhoto, suspect, "idle");

    sheet.hidden = false;
    void sheet.offsetWidth;
    sheet.classList.add("is-open");
    GameAudio.play("paper", { volume: 0.6 });
    sheetClose.focus();

    reviewed.add(suspect.id);
    card.closest(".file").classList.add("is-read");
  }

  function closeSheet() {
    if (sheet.hidden) return;
    sheet.classList.remove("is-open");
    sheet.hidden = true;
    GameAudio.play("paper", { volume: 0.4 });
    if (opener) opener.focus();
  }

  function enter() {
    updateBudget();
    root.classList.add("is-entered");
  }

  function leave() {
    closeSheet();
    root.classList.remove("is-entered");
  }

  list.addEventListener("click", (event) => {
    const card = event.target.closest(".file__button");
    if (!card) return;
    const suspect = suspects.find((entry) => entry.id === card.closest(".file").dataset.id);
    openSheet(suspect, card);
  });

  sheet.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='close']")) closeSheet();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeSheet();
  });

  interviewButton.addEventListener("click", () => {
    interviewButton.classList.remove("is-rattling");
    void interviewButton.offsetWidth;
    interviewButton.classList.add("is-rattling");
    GameAudio.play("rattle", { volume: 0.7 });
  });

  renderCards();

  return { enter, leave };
})();
