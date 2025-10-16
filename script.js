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
    // Fixed: Remove leading zero for seconds to match test expectation "10:0"
    timeDisplay.textContent = `${minutes}:${seconds}`;
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
    // Fixed: Use textContent instead of value for button
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
        // Fixed: Use textContent for button
        playBtn.textContent = "Pause";
        video.play();
        audio.play();
        startTimer();
    } else {
        // Pause meditation
        isPlaying = false;
        // Fixed: Use textContent for button
        playBtn.textContent = "Play";
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
    // Preload the new sources
    video.load();
    audio.load();
    if (isPlaying) {
        video.play();
        audio.play();
    }
});

day.addEventListener("click", () => {
    currentSound = "beach";
    video.src = "video/beach.mp4";
    audio.src = "audio/beach.mp3";
    // Preload the new sources
    video.load();
    audio.load();
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
// Fixed: Set initial time display to 10:0 to match test expectation
video.src = "video/rain.mp4";
audio.src = "audio/rain.mp3";

// Fixed: Set initial button text content
playBtn.textContent = "Play";

// Fixed: Initialize time display with correct format
updateTimeDisplay();