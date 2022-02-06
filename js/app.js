const timeDisplay = document.querySelector('.remaining-time');

// Select audio and video
const audio = document.querySelector(".track");
const video = document.querySelector(".background-vid video")

// Circle animation
const circleProgress = document.querySelector(".circle-progress");
const numberOfBreaths = document.querySelector(".data-breaths")
const instructions = document.querySelector(".instructions");

// All buttons
const start = document.querySelector(".start");
const buttons = document.querySelectorAll(".all-buttons");


let breathsLeft = 10;

// Begin button (start playing video and sound)
start.addEventListener('click', () => {
    start.classList.add("button-inactive");
    instructions.innerText = "Get relaxed and ready to start breathing";
    setTimeout(() => {
        instructions.innerText = "Breathing is about to begin...";
        setTimeout(() => {
            audio.play();
            video.play();
            showTimeAndReset();
            growCircle();
            breathTextUpdate();
            breathingApp();
        }, 2000);
    }, 2000);
});

// Select different sounds and video
const pickSounds = document.querySelectorAll(".sound-picker button");

pickSounds.forEach(sound => {
    sound.addEventListener("click", () => {
        audio.src = sound.getAttribute("data-sound");
        video.src = sound.getAttribute("data-video");
    });
});

// Select duration buttons
const durations = document.querySelectorAll(".set-time button");
let defaultDuration = 120;

durations.forEach(duration => {
    duration.addEventListener("click", () => {
        defaultDuration = duration.getAttribute("data-time");
        breathsLeft = duration.getAttribute("data-breaths");
        console.log(defaultDuration);
        console.log(breathsLeft);
        showTimeAndReset();
    });
});

// Show the remaining time
const remainingTime = document.querySelector(".remaining-time");

function showTimeAndReset() {

    if (audio.currentTime >= defaultDuration) {
        audio.pause();
        video.pause();
        audio.currentTime = 0;
    }

    let remainingTimeinSecs = defaultDuration - audio.currentTime;
    getRemainingTime(remainingTimeinSecs);

    if (!audio.paused) {
        requestAnimationFrame(showTimeAndReset);
        console.log("update");
    }
}

function getRemainingTime(timeInSecs) {
    let minutes = Math.floor(timeInSecs / 60);
    let seconds = Math.floor(timeInSecs % 60);

    // IF min/sec is a single digit(ex:9) we add a zero before the digit. (ex: 9 becomes 09)
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    timeDisplay.textContent = `${minutes}:${seconds}`;
}

// Grow/Shrink Circle
const growCircle = () => {
    circleProgress.classList.add('circle-grow');
    setTimeout(() => {
        circleProgress.classList.remove('circle-grow');
    }, 8000);
};

// App function
const breathingApp = () => {
    const breathAnimation = setInterval(() => {
        if (breathsLeft === 0) {
            clearInterval(breathAnimation);
            instructions.innerText = "Breathing session completed. Click 'Begin' to start another session!"
            return;
        }
        growCircle();
        breathTextUpdate();
        showTimeAndReset();
    }, 12000)
}

// breathing instructions
const breathTextUpdate = () => {
    breathsLeft--;
    instructions.innerText = "Breathe in";
    setTimeout(() => {
        instructions.innerText = "Hold Breath";
        setTimeout(() => {
            instructions.innerText = "Exhale slowly";
        }, 4000)
    }, 4000)
}