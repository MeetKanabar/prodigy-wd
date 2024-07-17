let startTime;
let updatedTime;
let difference;
let lastLapTime = 0;  
let timerInterval;

let running = false;

let lapsContainer = document.getElementById('laps');
let display = document.getElementById('display');
let circle = document.querySelector('.circle');
let StartPauseBtn = document.getElementById('StartPauseBtn');
let ResetBtn = document.getElementById('ResetBtn');
let LapBtn = document.getElementById('LapBtn');

function StartPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        StartPauseBtn.textContent = 'Pause';
        
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        StartPauseBtn.textContent = 'Start';
        running = false;
    }
}

function Reset() {
    clearInterval(timerInterval);
    display.textContent = '00:00:00.00';
    StartPauseBtn.textContent = 'Start';
    difference = 0;
    lastLapTime = 0;
    running = false;
    lapsContainer.innerHTML = '<div class="lap-header"><span>Lap Time</span><span>Total Time</span></div>';
    circle.style.background = `conic-gradient(#0f0 0%, #333 0%)`;
}

function recordLap() {
    if (running) {
        let currentLapTime = new Date().getTime() - startTime;
        let lapDifference = currentLapTime - lastLapTime;
        lastLapTime = currentLapTime;

        let laptime = document.createElement('div');
        laptime.classList.add('lap');
        laptime.innerHTML = `<span>${differenceToLap(lapDifference)}</span><span>${differenceToLap(currentLapTime)}</span>`;
        lapsContainer.insertBefore(laptime, lapsContainer.firstChild.nextSibling);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    let hours = Math.floor(updatedTime / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((updatedTime % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;

    let progress = (updatedTime % 60000) / 60000 * 100;  
    circle.style.background = `conic-gradient(#0f0 ${progress}%, #333 ${progress}%)`;
}

function differenceToLap(diff) {
    let hours = Math.floor(diff / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((diff % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

StartPauseBtn.addEventListener("click", StartPause);
ResetBtn.addEventListener("click", Reset);
LapBtn.addEventListener("click", recordLap);
