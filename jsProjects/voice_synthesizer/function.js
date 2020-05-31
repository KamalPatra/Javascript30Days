const msg = new SpeechSynthesisUtterance();

let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes(""))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}
function toggle(startOver = true) {
  speechSynthesis.cancel();

  if (startOver) {
    speechSynthesis.speak(msg);
  }
}
function speak() {
  speechSynthesis.speak(msg);
}
function setOptions() {
  console.log(this.name, this.value);
  msg[this.name] = this.value;
  toggle();
}
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}
stopButton.addEventListener("click", () => toggle(false));
speakButton.addEventListener("click", toggle);
speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOptions));
