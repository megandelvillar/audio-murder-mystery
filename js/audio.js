const GameAudio = (() => {
  const sources = {
    scream: "audio/sfx/scream.mp3",
    glass: "audio/sfx/glass-break.mp3",
    ambience: "audio/sfx/tension-music.mp3",
    phone: "audio/sfx/phone-ring.mp3",
    paper: "audio/sfx/paper-slide.mp3",
    rattle: "audio/sfx/chain-rattle.mp3",
    tape: "audio/sfx/tape-click.mp3",
    intro: "audio/narrator/intro.mp3"
  };

  const SILENT_ANSWER_MS = 3000;

  const sounds = new Map();
  let muted = false;
  let voice = null;

  function prime() {
    Object.entries(sources).forEach(([name, src]) => {
      if (sounds.has(name)) return;
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.muted = true;
      sounds.set(name, audio);
      audio.play()
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
        })
        .catch(() => {})
        .finally(() => {
          audio.muted = muted;
        });
    });
  }

  function play(name, { volume = 1, loop = false } = {}) {
    const audio = sounds.get(name);
    if (!audio) return null;
    audio.currentTime = 0;
    audio.loop = loop;
    audio.volume = volume;
    audio.play().catch(() => {});
    return audio;
  }

  function setVolume(name, volume) {
    const audio = sounds.get(name);
    if (audio) audio.volume = volume;
  }

  function fadeOut(name, duration = 1500) {
    const audio = sounds.get(name);
    if (!audio) return;
    const start = audio.volume;
    const steps = 20;
    let step = 0;
    const timer = setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, start * (1 - step / steps));
      if (step >= steps) {
        clearInterval(timer);
        audio.pause();
      }
    }, duration / steps);
  }

  let cancelVoice = () => {};
  let pauseCurrent = () => {};
  let resumeCurrent = () => {};
  let voicePaused = false;

  function stopVoice() {
    cancelVoice();
    cancelVoice = () => {};
    pauseCurrent = () => {};
    resumeCurrent = () => {};
    voicePaused = false;
  }

  function pauseVoice() {
    pauseCurrent();
  }

  function resumeVoice() {
    resumeCurrent();
  }

  // Plays one recorded answer. A missing file counts as a short silent answer.
  function speak(src, onDone) {
    stopVoice();
    const audio = new Audio(src);
    audio.muted = muted;
    let finished = false;
    let failed = false;
    let timer = 0;

    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(timer);
      voice = null;
      onDone();
    };

    voice = audio;
    cancelVoice = () => {
      finished = true;
      clearTimeout(timer);
      audio.pause();
      voice = null;
    };

    pauseCurrent = () => {
      if (finished || voicePaused) return;
      voicePaused = true;
      clearTimeout(timer);
      audio.pause();
    };

    resumeCurrent = () => {
      if (finished || !voicePaused) return;
      voicePaused = false;
      if (failed) timer = setTimeout(finish, SILENT_ANSWER_MS);
      else audio.play().catch(() => {});
    };

    audio.addEventListener("ended", finish);
    audio.addEventListener("error", () => {
      failed = true;
      if (!voicePaused) timer = setTimeout(finish, SILENT_ANSWER_MS);
    });
    audio.play().catch(() => {});
  }

  // Pauses a playing sound, resumes a paused one, or starts it from the beginning.
  function toggle(name) {
    const audio = sounds.get(name);
    if (!audio) return "idle";
    if (!audio.paused) {
      audio.pause();
      return "paused";
    }
    if (audio.currentTime > 0 && !audio.ended) {
      audio.volume = 1;
      audio.play().catch(() => {});
      return "playing";
    }
    play(name);
    return "playing";
  }

  function stop(name) {
    const audio = sounds.get(name);
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  function toggleMute() {
    muted = !muted;
    sounds.forEach((audio) => {
      audio.muted = muted;
    });
    if (voice) voice.muted = muted;
    return muted;
  }

  return {
    prime,
    play,
    setVolume,
    fadeOut,
    speak,
    stopVoice,
    pauseVoice,
    resumeVoice,
    isVoicePaused: () => voicePaused,
    toggle,
    stop,
    element: (name) => sounds.get(name),
    toggleMute
  };
})();
