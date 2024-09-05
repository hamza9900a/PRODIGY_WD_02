// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const lapButton = document.getElementById('lap');
    const lapList = document.getElementById('lapList');
    const recentLap = document.getElementById('recentLap');
    const alarmInput = document.getElementById('alarmTime');
    const setAlarmButton = document.getElementById('setAlarm');
    
    let timer;
    let isRunning = false;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
    let alarmTime = null;

    function updateDisplay() {
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        document.getElementById('milliseconds').textContent = formatTime(milliseconds);
    }

    function formatTime(value) {
        return value.toString().padStart(2, '0');
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            timer = setInterval(() => {
                milliseconds++;
                if (milliseconds >= 100) {
                    milliseconds = 0;
                    seconds++;
                }
                if (seconds >= 60) {
                    seconds = 0;
                    minutes++;
                }
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
                updateDisplay();
                
                // Check for alarm
                if (alarmTime && hours * 3600 + minutes * 60 + seconds >= alarmTime) {
                    alert('Alarm!');
                    alarmTime = null; // Clear alarm after triggering
                }
            }, 10);
        }
    }

    function pauseTimer() {
        clearInterval(timer);
        isRunning = false;
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        updateDisplay();
        lapList.innerHTML = ''; // Clear lap times
        recentLap.textContent = 'Recent Lap: 00:00:00:00'; // Reset recent lap
    }

    function addLap() {
        if (isRunning) {
            const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
            const lapItem = document.createElement('li');
            lapItem.textContent = lapTime;
            lapList.appendChild(lapItem);
            recentLap.textContent = `Recent Lap: ${lapTime}`; // Update recent lap
        }
    }

    function setAlarm() {
        const alarmValue = parseInt(alarmInput.value, 10);
        if (!isNaN(alarmValue) && alarmValue > 0) {
            alarmTime = alarmValue;
            alert(`Alarm set for ${alarmValue} seconds.`);
        } else {
            alert('Please enter a valid number.');
        }
    }

    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    lapButton.addEventListener('click', addLap);
    setAlarmButton.addEventListener('click', setAlarm);
});
