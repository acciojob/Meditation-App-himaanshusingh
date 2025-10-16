// Get DOM elements
const night = document.getElementById("night");
const day = document.getElementById("day");
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

// Update time display - FIXED: Proper time formatting
function updateTimeDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // Format seconds to always show 2 digits
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  timeDisplay.textContent = `${minutes}:${formattedSeconds}`;
}

// Start countdown timer - FIXED: Proper timer logic
function startTimer() {
  clearInterval(countdown);

  // Update display immediately when starting
  updateTimeDisplay();

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
  playBtn.textContent = "Play";
  audio.pause();
  audio.currentTime = 0;
  video.pause();
  video.currentTime = 0;
  clearInterval(countdown);
}

// Play/pause functionality
playBtn.addEventListener("click", () => {
  if (!isPlaying) {
    // Start meditation
    isPlaying = true;
    playBtn.textContent = "Pause";

    // Ensure video and audio are ready to play
    video.play().catch((e) => console.log("Video play error:", e));
    audio.play().catch((e) => console.log("Audio play error:", e));

    startTimer();
  } else {
    // Pause meditation
    isPlaying = false;
    playBtn.textContent = "Play";
    video.pause();
    audio.pause();
    clearInterval(countdown);
  }
});

// Sound picker functionality
night.addEventListener("click", () => {
  currentSound = "rain";
  video.src = "Sounds and videos/rain.mp4";
  audio.src = "Sounds and videos/rain.mp3";
  // Preload the new sources
  video.load();
  audio.load();
  if (isPlaying) {
    video.play().catch((e) => console.log("Video play error:", e));
    audio.play().catch((e) => console.log("Audio play error:", e));
  }
});

day.addEventListener("click", () => {
  currentSound = "beach";
  video.src = "Sounds and videos/beach.mp4";
  audio.src = "Sounds and videos/beach.mp3";
  // Preload the new sources
  video.load();
  audio.load();
  if (isPlaying) {
    video.play().catch((e) => console.log("Video play error:", e));
    audio.play().catch((e) => console.log("Audio play error:", e));
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
function initializeApp() {
  // Set initial sources
  video.src = "Sounds and videos/rain.mp4";
  audio.src = "Sounds and videos/rain.mp3";

  // Set video to loop and autoplay (muted)
  video.loop = true;
  video.muted = true;
  audio.loop = true;

  // Load initial sources
  video.load();
  audio.load();

  // Set initial button text
  playBtn.textContent = "Play";

  // Initialize time display with correct format
  updateTimeDisplay();
}

// Initialize the app when the page loads
window.addEventListener("load", initializeApp);
