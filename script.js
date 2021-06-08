let timesPlayed = 0;
let randomNo = -1;
let choicesEntered = 0;
let choices = [];

const gameDiv = document.querySelector("#game-div");
const startBtn = document.querySelector("#start-btn");
const submitChoiceBtn = document.querySelector("#submit-btn");
const inputField = document.querySelector("#number-input");
const outputSpan = document.querySelector("#choices-output");

const successText = document.querySelector("#success-text");
const failureText = document.querySelector("#failure-text");

function random(x) {
  return Math.floor(Math.random() * (x + 1));
}

let onChoiceSubmit = () => {
  let value = inputField.value;
  choices.push(value);
  choicesEntered++;

  if (value == randomNo) {
    gameDiv.style.display = "none";
    startBtn.style.display = "inline-block";
    startBtn.textContent = "Start Again!";

    failureText.style.display = "none";
    successText.style.display = "block";
  } else {
    successText.style.display = "none";
    failureText.style.display = "block";

    outputSpan.textContent = choices.join(" ");
    if (choicesEntered === 10) {
      failureText.textContent = "All attempts used!!!";

      gameDiv.style.display = "none";
      startBtn.style.display = "inline-block";
      startBtn.textContent = "Retry!";
    } else {
      failureText.textContent =
        +value < randomNo
          ? "The answer is larger than this"
          : "The answer is smaller than this";
    }
  }
  inputField.value = "";
  inputField.focus();
};

startBtn.addEventListener("click", (e) => {
  choicesEntered = 0;
  choices = [];
  timesPlayed++;
  randomNo = random(100);

  gameDiv.style.display = "block";
  inputField.value = "";
  inputField.focus();
  outputSpan.textContent = "";
  startBtn.style.display = "none";
  successText.style.display = "none";
  failureText.style.display = "none";
});

submitChoiceBtn.addEventListener("click", onChoiceSubmit);
inputField.addEventListener("keyup", (e) => {
  if (e.key === "Enter") onChoiceSubmit();
});
