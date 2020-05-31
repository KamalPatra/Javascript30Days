let countdown;
const counterDisplay = document.querySelector(".display_counter");
const endTime = document.querySelector(".display_endtime");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${
    remainderSeconds < 10 ? "0" : ""
  }${remainderSeconds}`;
  counterDisplay.textContent = display;
  document.title = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 || hour == 0 ? Math.abs(hour - 12) : hour;
  const minutes = end.getMinutes();
  endTime.textContent = `Your breaks ends at ${adjustedHour}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

buttons.forEach((button) =>
  button.addEventListener("click", function () {
    timer(parseInt(this.dataset.time));
  })
);

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
