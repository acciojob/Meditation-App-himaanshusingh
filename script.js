const rainVideo = document.getElementById("rain-video");
const beachVideo = document.getElementById("beach-video");
const rainSound = document.getElementById("rain-sound");
const beachSound = document.getElementById("beach-sound");
const rainBtn = document.getElementById("rain-btn");
const beachBtn = document.getElementById("beach-btn");
const smallerMinsBtn = document.getElementById("smaller-mins");
const mediumMinsBtn = document.getElementById("medium-mins");
const longMinsBtn = document.getElementById("long-mins");
const timeDisplay = document.querySelector(".time-display");
const controlBtn = document.querySelector(".play");

// Sound selection
rainBtn.onclick = () => {
  beachVideo.style.display = "none";
  beachSound.style.display = "none";
  rainVideo.style.display = "block";
  rainSound.style.display = "block";
  isBeachActive = false;
};

beachBtn.onclick = () => {
  rainVideo.style.display = "none";
  rainSound.style.display = "none";
  beachVideo.style.display = "block";
  beachSound.style.display = "block";
  isBeachActive = true;
};

let countdown = 600; // default 10 minutes in seconds
let intervalId = null;
let isBeachActive = false;

function updateTimeDisplay() {
  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  timeDisplay.textContent = `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function startCountdown() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => {
    if (countdown > 0) countdown--, updateTimeDisplay();
    else pauseAll(), clearInterval(intervalId);
  }, 1000);
}

function safePlay(media) {
  if (!media) return;
  try {
    const p = media.play();
    if (p && typeof p.catch === "function") {
      p.catch((err) => {
        if (err.name !== "NotSupportedError") throw err;
      });
    }
  } catch (err) {
    if (err.name !== "NotSupportedError") throw err;
  }
}

function pauseAll() {
  rainVideo.pause();
  rainSound.pause();
  beachVideo.pause();
  beachSound.pause();
  controlBtn.textContent = "Play";
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

// Timer selection
smallerMinsBtn.onclick = () => {
  countdown = 120; // 2 minutes
  updateTimeDisplay();
};

mediumMinsBtn.onclick = () => {
  countdown = 300; // 5 minutes
  updateTimeDisplay();
};

longMinsBtn.onclick = () => {
  countdown = 600; // 10 minutes
  updateTimeDisplay();
};

controlBtn.addEventListener("click", () => {
  if (beachVideo.style.display == "block") {
    if (beachVideo.paused) {
      safePlay(beachVideo);
      safePlay(beachSound);
      startCountdown();
      controlBtn.textContent = "Pause";
    } else pauseAll();
  } else {
    if (rainVideo.paused) {
      safePlay(rainVideo);
      safePlay(rainSound);
      startCountdown();
      controlBtn.textContent = "Pause";
    } else pauseAll();
  }
});

// Initialize display
updateTimeDisplay();
