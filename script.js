//your JS code here. If required.
// Get DOM elements
const night = document.getElementById("night");
const day = document.querySelector("#day");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const smallerMins = document.getElementById("smaller-mins");
const mediumMins = document.getElementById("medium-mins");
const longMins = document.getElementById("long-mins");
const video = document.querySelector("video");
const audio = document.querySelector("audio");

// Initialize variables
let totalSeconds = 600; // 10 minutes default
let isPlaying = false;
let countdown;
let currentSound = "rain"; // Default sound

// Update time display
function updateTimeDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timeDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Start countdown timer
function startTimer() {
  clearInterval(countdown);

  countdown = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(countdown);
      resetMeditation();
      return;
    }

    totalSeconds--;
    updateTimeDisplay();
  }, 1000);
}

// Reset meditation to initial state
function resetMeditation() {
  isPlaying = false;
  playBtn.value = "Play";
  audio.pause();
  audio.currentTime = 0;
  clearInterval(countdown);
}

// Play/pause functionality
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // Start meditation
    isPlaying = true;
    playBtn.value = "Pause";
    video.play();
    audio.play();
    startTimer();
  } else {
    // Pause meditation
    isPlaying = false;
    playBtn.value = "Play";
    video.pause();
    audio.pause();
    clearInterval(countdown);
  }
});

// Sound picker functionality
night.addEventListener("click", () => {
  currentSound = "rain";
  video.src = "video/rain.mp4";
  audio.src = "audio/rain.mp3";
  if (isPlaying) {
    video.play();
    audio.play();
  }
});

day.addEventListener("click", () => {
  currentSound = "beach";
  video.src = "video/beach.mp4";
  audio.src = "audio/beach.mp3";
  if (isPlaying) {
    video.play();
    audio.play();
  }
});

// Time selection functionality
smallerMins.addEventListener("click", () => {
  totalSeconds = 120; // 2 minutes
  updateTimeDisplay();
  resetMeditation();
});

mediumMins.addEventListener("click", () => {
  totalSeconds = 300; // 5 minutes
  updateTimeDisplay();
  resetMeditation();
});

longMins.addEventListener("click", () => {
  totalSeconds = 600; // 10 minutes
  updateTimeDisplay();
  resetMeditation();
});

// Initialize with default values
video.src = "video/rain.mp4";
audio.src = "audio/rain.mp3";
updateTimeDisplay();
