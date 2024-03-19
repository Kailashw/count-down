let countdown;
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
let datetimepicker = document.getElementById('datetimepicker');

// Load countdown value from local storage
let countdownValue = localStorage.getItem('countdown');
if (countdownValue) {
  datetimepicker.value = countdownValue;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  let selectedTime = new Date(datetimepicker.value).getTime();
  let now = new Date().getTime();
  let seconds = Math.floor((selectedTime - now) / 1000);

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      clearInterval(countdown);
      timerDisplay.textContent = 'Time\'s up!';
      setAlarm();
      return;
    }
    displayTimeLeft(seconds);
  }, 1000);

  // Save countdown value to local storage
  localStorage.setItem('countdown', datetimepicker.value);
}

function displayTimeLeft(seconds) {
  const days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  timerDisplay.textContent = seconds ? `${days}d ${hours}h ${minutes}m ${remainingSeconds}s` : 'Time Up !!';
}

function resetTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = '00:00:00';
  localStorage.removeItem('countdown'); // Remove countdown value from local storage
}

function setAlarm() {
  // Your alarm logic here
  alert('Alarm! Time\'s up!');
  // You can also play an audio file or trigger any other action as your alarm
}
