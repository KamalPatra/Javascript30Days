const timeNodes = document.querySelectorAll("[data-time]");
const timeNodesArr = Array.from(timeNodes);
console.log("time nodes", timeNodes);
const seconds = timeNodesArr
  .map((node) => node.dataset.time)
  .map((timeCode) => {
    const [mins, secs] = timeCode.split(":").map(parseFloat);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds);

let secondsLeft = seconds;
const hours = Math.floor(secondsLeft / 3600);
secondsLeft = secondsLeft % 3600;
const mins = Math.floor(secondsLeft / 60);
console.log(hours, mins);
secondsLeft = secondsLeft % 60;
console.log(hours, mins, secondsLeft);

timeNodes.forEach((node) => {
  const text = node.textContent;
  node.innerHTML = `${text} <span class='timestamp'>${node.getAttribute(
    "data-time"
  )}`;

  if (timeNodes[timeNodes.length - 1] === node) {
    console.log("last node", node);
    const li = document.createElement("li");
    li.innerHTML = `Total Content
    <span class='timestamp'>${hours} Hrs ${mins} m ${secondsLeft} s</span>`;
    node.after(li);
  }
});
