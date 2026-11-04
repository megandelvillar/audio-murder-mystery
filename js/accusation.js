const Accusation = (() => {
  const PARTS = ["killer", "motive", "entry"];
  const CONFIRM_MS = 5000;

  const root = document.getElementById("accuse");
  const groups = document.getElementById("accuse-groups");
  const fileButton = root.querySelector("[data-action='file']");
  const hint = document.getElementById("accuse-hint");

  let confirming = false;
  let confirmTimer = 0;
  let onFile = () => {};

  function renderGroups() {
    PARTS.forEach((part) => {
      const category = CHECKLIST.find((entry) => entry.id === part);
      const fieldset = document.createElement("fieldset");
      fieldset.className = "group group--" + part;
      fieldset.innerHTML = '<legend class="group__title"></legend><div class="group__choices"></div>';
      fieldset.querySelector(".group__title").textContent = category.title;

      const choices = fieldset.querySelector(".group__choices");
      category.options.forEach((option) => {
        const choice = document.createElement("label");
        choice.className = "choice";
        choice.innerHTML =
          '<input class="choice__input" type="radio">' +
          '<span class="choice__card"><span class="choice__photo"></span><span class="choice__label"></span></span>';

        const input = choice.querySelector("input");
        input.name = part;
        input.value = option.id;
        choice.querySelector(".choice__label").textContent = option.label;

        const suspect = part === "killer" ? suspects.find((entry) => entry.id === option.id) : null;
        if (suspect) {
          Portraits.fill(choice.querySelector(".choice__photo"), suspect, "portrait");
        } else {
          choice.querySelector(".choice__photo").remove();
          choice.classList.add("choice--text");
        }
        choices.appendChild(choice);
      });
      groups.appendChild(fieldset);
    });
  }

  function report() {
    const result = {};
    PARTS.forEach((part) => {
      const picked = groups.querySelector('input[name="' + part + '"]:checked');
      result[part] = picked ? picked.value : null;
    });
    return result;
  }

  function isComplete() {
    return PARTS.every((part) => report()[part]);
  }

  function cancelConfirm() {
    confirming = false;
    clearTimeout(confirmTimer);
    fileButton.textContent = "File the report";
  }

  function refresh() {
    const complete = isComplete();
    fileButton.setAttribute("aria-disabled", String(!complete));
    if (!complete) {
      hint.textContent = "Choose the killer, the motive and the way in.";
    } else if (confirming) {
      hint.textContent = "Once it is filed, the case is closed. Click again to confirm.";
    } else {
      hint.textContent = "Ready when you are.";
    }
  }

  function rattle() {
    fileButton.classList.remove("is-rattling");
    void fileButton.offsetWidth;
    fileButton.classList.add("is-rattling");
    GameAudio.play("rattle", { volume: 0.7 });
  }

  function file() {
    if (!isComplete()) {
      rattle();
      return;
    }
    if (!confirming) {
      confirming = true;
      fileButton.textContent = "Yes, file it";
      confirmTimer = setTimeout(() => {
        cancelConfirm();
        refresh();
      }, CONFIRM_MS);
      refresh();
      return;
    }
    cancelConfirm();
    GameAudio.play("tape", { volume: 0.8 });
    onFile(report());
  }

  function reset() {
    cancelConfirm();
    groups.querySelectorAll("input").forEach((input) => {
      input.checked = false;
    });
    refresh();
  }

  function enter() {
    refresh();
    root.classList.add("is-entered");
  }

  function leave() {
    cancelConfirm();
    root.classList.remove("is-entered");
  }

  groups.addEventListener("change", () => {
    cancelConfirm();
    GameAudio.play("paper", { volume: 0.4 });
    refresh();
  });

  fileButton.addEventListener("click", file);

  renderGroups();
  refresh();

  return {
    enter,
    leave,
    reset,
    onFile: (callback) => {
      onFile = callback;
    }
  };
})();
