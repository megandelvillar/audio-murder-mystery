const GameAudio = (() => {
  const sources = {
    scream: "audio/sfx/scream.mp3",
    glass: "audio/sfx/glass-break.mp3",
    ambience: "audio/sfx/room-tone.mp3",
    phone: "audio/sfx/phone-ring.mp3",
    paper: "audio/sfx/paper-slide.mp3",
    rattle: "audio/sfx/chain-rattle.mp3",
    tape: "audio/sfx/tape-click.mp3"
  };

  const sounds = new Map();
  let muted = false;

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

  function toggleMute() {
    muted = !muted;
    sounds.forEach((audio) => {
      audio.muted = muted;
    });
    return muted;
  }

  return { prime, play, fadeOut, toggleMute };
})();
