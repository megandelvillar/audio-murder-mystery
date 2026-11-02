// Connects the data (suspects, categories) to the page.

let currentSuspect = null;   // which suspect the user is questioning
let currentAudio = [];       // audio that is playing right now

const suspectsDiv = document.getElementById("suspects");
const questionsDiv = document.getElementById("questions");
const statusP = document.getElementById("status");

// Make one button per suspect
suspects.forEach(function (suspect) {
  const btn = document.createElement("button");
  btn.textContent = suspect.name;
  btn.addEventListener("click", function () {
    currentSuspect = suspect;
    // highlight only the chosen button
    document.querySelectorAll("#suspects button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    statusP.textContent = "Questioning " + suspect.name + ". Ask something.";
  });
  suspectsDiv.appendChild(btn);
});

// Make one button per question
CATEGORIES.forEach(function (category) {
  const btn = document.createElement("button");
  btn.textContent = category.question;
  btn.addEventListener("click", function () {
    ask(category.id);
  });
  questionsDiv.appendChild(btn);
});

// Plays the answer of the current suspect for a category
function ask(categoryId) {
  if (!currentSuspect) {
    statusP.textContent = "Choose a suspect first.";
    return;
  }

  const answer = getAnswer(currentSuspect, categoryId);
  if (!answer) {
    statusP.textContent = currentSuspect.name + " has nothing to say about that.";
    return;
  }

  stopAudio();
  play(answer.file);
  if (answer.sfx) play(answer.sfx);   // sound effect at the same time as the voice
  statusP.textContent = currentSuspect.name + " is answering...";
}

function play(path) {
  const audio = new Audio(path);
  currentAudio.push(audio);
  // the recordings do not exist yet, so show a message instead of crashing
  audio.addEventListener("error", function () {
    statusP.textContent = "Audio file not found yet: " + path;
  });
  audio.play().catch(function () {});
}

function stopAudio() {
  currentAudio.forEach(a => a.pause());
  currentAudio = [];
}
