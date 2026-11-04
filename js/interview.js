const Interview = (() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const MOUTH_MS = 220;
  const TOAST_MS = 5000;

  const root = document.getElementById("interview");
  const tabs = document.getElementById("interview-tabs");
  const budget = document.getElementById("interview-budget");
  const evidence = document.getElementById("interview-evidence");
  const stage = document.getElementById("stage");
  const stageIdle = document.getElementById("stage-idle");
  const stageTalking = document.getElementById("stage-talking");
  const stageName = document.getElementById("stage-name");
  const stageRole = document.getElementById("stage-role");
  const list = document.getElementById("questions");
  const hint = document.getElementById("interview-hint");
  const toast = document.getElementById("toast");

  let current = null;
  let pending = null;
  let mouthTimer = 0;
  let toastTimer = 0;

  function renderTabs() {
    suspects.forEach((suspect) => {
      const item = document.createElement("li");
      item.innerHTML = '<button class="tab" type="button"><span class="tab__photo"></span><span class="tab__name"></span></button>';
      item.querySelector(".tab").dataset.id = suspect.id;
      item.querySelector(".tab__name").textContent = suspect.name.split(" ")[0];
      Portraits.fill(item.querySelector(".tab__photo"), suspect, "portrait");
      tabs.appendChild(item);
    });
  }

  function renderQuestions() {
    QUESTIONS.forEach((question, index) => {
      const item = document.createElement("li");
      item.innerHTML =
        '<button class="slip" type="button">' +
        '<span class="slip__number">Q' + (index + 1) + "</span>" +
        '<span class="slip__text"></span>' +
        '<span class="slip__stamp" aria-hidden="true">Heard</span>' +
        "</button>";
      const button = item.querySelector(".slip");
      button.dataset.key = question.key;
      item.querySelector(".slip__text").textContent = question.text;
      list.appendChild(item);
    });
  }

  function refresh() {
    const left = Game.questionsLeft();
    budget.textContent = left + (left === 1 ? " question left" : " questions left");
    evidence.textContent = "Evidence " + Game.foundCount() + " of " + CLUES.length;

    tabs.querySelectorAll(".tab").forEach((tab) => {
      tab.setAttribute("aria-current", String(current && tab.dataset.id === current.id));
    });

    list.querySelectorAll(".slip").forEach((slip) => {
      const heard = Game.hasHeard(current.id, slip.dataset.key);
      slip.classList.toggle("is-heard", heard);
      const locked = !heard && left === 0;
      slip.classList.toggle("is-locked", locked);
      slip.setAttribute("aria-disabled", String(locked || Boolean(pending)));
    });

    if (pending) {
      hint.textContent = "";
    } else if (left === 0) {
      hint.textContent = "No questions left. Time to decide who did it.";
    } else {
      hint.textContent = "Answers you have already heard can be replayed for free.";
    }
  }

  function startMouth() {
    stage.classList.add("is-speaking");
    if (reducedMotion) {
      stage.classList.add("is-open");
      return;
    }
    mouthTimer = setInterval(() => stage.classList.toggle("is-open"), MOUTH_MS);
  }

  function stopMouth() {
    clearInterval(mouthTimer);
    stage.classList.remove("is-speaking", "is-open");
  }

  function showToast(fresh) {
    toast.textContent = "New evidence: " + fresh.map((clue) => "No. " + clue.slot + ", " + clue.title).join(" and ");
    toast.hidden = false;
    void toast.offsetWidth;
    toast.classList.add("is-visible");
    GameAudio.play("paper", { volume: 0.6 });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("is-visible");
      toastTimer = setTimeout(() => { toast.hidden = true; }, 400);
    }, TOAST_MS);
  }

  function finishAnswer() {
    if (!pending) return;
    const { id, key } = pending;
    pending = null;
    stopMouth();

    const fresh = Game.collectClues(id, key);
    fresh.forEach((clue) => CaseFile.unlock(clue.slot, { title: clue.title, text: clue.text }));
    if (fresh.length) showToast(fresh);
    Evidence.refresh();
    refresh();
  }

  function stopAnswer() {
    GameAudio.stopVoice();
    finishAnswer();
  }

  function ask(button) {
    if (pending || !current) return;
    const key = button.dataset.key;

    if (!Game.ask(current.id, key)) {
      button.classList.remove("is-rattling");
      void button.offsetWidth;
      button.classList.add("is-rattling");
      GameAudio.play("rattle", { volume: 0.7 });
      return;
    }

    pending = { id: current.id, key };
    startMouth();
    refresh();
    GameAudio.speak("audio/" + current.id + "/" + key + ".mp3", finishAnswer);
  }

  function setSuspect(id) {
    stopAnswer();
    current = suspects.find((suspect) => suspect.id === id);
    stageName.textContent = current.name;
    stageRole.textContent = current.role + ", " + current.age;
    Portraits.fill(stageIdle, current, "idle");
    Portraits.layer(stageTalking, current, "talking");
    refresh();
  }

  function enter(id) {
    setSuspect(id);
    root.classList.add("is-entered");
  }

  function leave() {
    stopAnswer();
    root.classList.remove("is-entered");
  }

  tabs.addEventListener("click", (event) => {
    const tab = event.target.closest(".tab");
    if (tab && !pending && tab.dataset.id !== current.id) setSuspect(tab.dataset.id);
  });

  list.addEventListener("click", (event) => {
    const slip = event.target.closest(".slip");
    if (slip) ask(slip);
  });

  renderTabs();
  renderQuestions();

  function reset() {
    current = null;
  }

  return { enter, leave, reset, currentId: () => (current ? current.id : null) };
})();
