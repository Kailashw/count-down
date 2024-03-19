let countdown;
let timerDisplay = document.getElementById('timer');
let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
let datePicker = document.getElementById('datePicker');

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
  hideElements([startButton, datePicker]);
  
  const selectedDate = datePicker.valueAsDate;
  const now = new Date();
  const seconds = Math.floor((selectedDate - now) / 1000);
  
  if (seconds <= 0) {
    alert("Please select a future date.");
    showElements([startButton, datePicker]);
    return;
  }

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    seconds--;
    if (seconds < 0) {
      timerDisplay.textContent = 'Time\'s up!';
      clearInterval(countdown);
      setAlarm();
      return;
    }
    displayTimeLeft(seconds);
  }, 1000);
}

function displayTimeLeft(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  function setAlarm() {
    // Play the beep sound
    const beepSound = new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgA');
    beepSound.play();
    alert('Alarm! Time\'s up!');
  }

  
function resetTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = '00:00:00';
  showElements([startButton, datePicker]);
}

function hideElements(elements) {
  elements.forEach(element => {
    element.style.display = 'none';
  });
}

function showElements(elements) {
  elements.forEach(element => {
    element.style.display = '';
  });
}
