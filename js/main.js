(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, reducedMotion ? Math.min(ms, 200) : ms));

  const OPENING_LINE = "A murder has occurred, Sherlock. Are you available?";
  const DOUBT_LINE = "Someone who has run out of time. A murder has occurred. Are you available?";
  const CLOSING_LINE = "Good. Put your headphones on.";

  const screens = {
    gate: document.getElementById("screen-gate"),
    landing: document.getElementById("screen-landing"),
    cases: document.getElementById("screen-cases"),
    casefile: document.getElementById("screen-casefile"),
    suspects: document.getElementById("screen-suspects")
  };
  const wipe = document.getElementById("wipe");
  const soundToggle = document.getElementById("sound-toggle");

  const title = screens.landing.querySelector(".title");
  const tagline = screens.landing.querySelector(".tagline");
  const call = screens.landing.querySelector(".call");
  const callText = document.getElementById("call-text");
  const callOptions = document.getElementById("call-options");

  const board = document.getElementById("board");

  function showScreen(name) {
    Object.entries(screens).forEach(([key, element]) => {
      element.classList.toggle("is-active", key === name);
    });
  }

  async function wipeTo(name) {
    if (reducedMotion) {
      showScreen(name);
      return;
    }
    wipe.getAnimations().forEach((animation) => animation.cancel());
    const timing = { duration: 650, easing: "cubic-bezier(.7, 0, .3, 1)", fill: "forwards" };
    await wipe.animate(
      [{ transform: "translateY(100%)" }, { transform: "translateY(0)" }],
      timing
    ).finished;
    showScreen(name);
    await wait(150);
    await wipe.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100%)" }],
      timing
    ).finished;
  }

  async function typeText(element, text) {
    element.textContent = "";
    for (const character of text) {
      element.textContent += character;
      await wait(34 + Math.random() * 30);
    }
  }

  function showOptions(answers) {
    callOptions.querySelectorAll("button").forEach((button) => {
      button.hidden = !answers.includes(button.dataset.answer);
    });
    callOptions.classList.add("is-visible");
  }

  async function playIntro() {
    GameAudio.prime();
    showScreen("landing");
    await wait(1600);

    screens.landing.classList.add("is-scream");
    GameAudio.play("scream");
    await wait(1200);

    screens.landing.classList.add("is-shattered");
    GameAudio.play("glass");
    await wait(1000);

    title.classList.add("is-visible");
    GameAudio.play("ambience", { loop: true, volume: 0.3 });
    await wait(1700);

    tagline.classList.add("is-visible");
    await wait(2000);

    call.classList.add("is-visible");
    GameAudio.play("phone");
    await wait(900);

    await typeText(callText, OPENING_LINE);
    showOptions(["here", "who"]);
  }

  async function handleAnswer(choice) {
    callOptions.classList.remove("is-visible");
    GameAudio.play("paper", { volume: 0.6 });

    if (choice === "who") {
      await typeText(callText, DOUBT_LINE);
      showOptions(["here"]);
      return;
    }

    await typeText(callText, CLOSING_LINE);
    await wait(1000);
    await wipeTo("cases");
  }

  let pointerFrame = 0;
  function trackPointer(event) {
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      board.style.setProperty("--mx", `${event.clientX}px`);
      board.style.setProperty("--my", `${event.clientY}px`);
      pointerFrame = 0;
    });
  }

  function rattle(card) {
    card.classList.remove("is-rattling");
    void card.offsetWidth;
    card.classList.add("is-rattling");
    card.classList.add("is-hinting");
    GameAudio.play("rattle", { volume: 0.7 });
    setTimeout(() => card.classList.remove("is-hinting"), 2200);
  }

  let opening = false;
  async function openCase(card) {
    if (opening) return;
    opening = true;
    GameAudio.play("tape");
    card.classList.add("is-picked");
    board.classList.add("is-leaving");
    await wait(750);
    await wipeTo("casefile");
    CaseFile.enter();
    card.classList.remove("is-picked");
    board.classList.remove("is-leaving");
    opening = false;
  }

  document.getElementById("gate-play").addEventListener("click", playIntro, { once: true });

  callOptions.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) handleAnswer(button.dataset.answer);
  });

  screens.cases.addEventListener("pointermove", trackPointer);

  board.addEventListener("click", (event) => {
    const card = event.target.closest(".polaroid");
    if (!card) return;
    if (card.dataset.state === "locked") {
      rattle(card);
    } else {
      openCase(card);
    }
  });

  screens.casefile.querySelector("[data-action='back']").addEventListener("click", () => {
    GameAudio.play("paper", { volume: 0.6 });
    CaseFile.leave();
    wipeTo("cases");
  });

  screens.casefile.querySelector("[data-action='suspects']").addEventListener("click", async () => {
    GameAudio.play("paper", { volume: 0.6 });
    CaseFile.leave();
    await wipeTo("suspects");
    SuspectFiles.enter();
  });

  screens.suspects.querySelector("[data-action='back']").addEventListener("click", async () => {
    GameAudio.play("paper", { volume: 0.6 });
    SuspectFiles.leave();
    await wipeTo("casefile");
    CaseFile.enter();
  });

  soundToggle.addEventListener("click", () => {
    const muted = GameAudio.toggleMute();
    soundToggle.textContent = muted ? "Sound off" : "Sound on";
    soundToggle.setAttribute("aria-pressed", String(!muted));
  });
})();
