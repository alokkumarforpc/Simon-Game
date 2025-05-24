const gameSeq = [];
let userSeq = [];
const btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

const h2 = document.querySelector("h2");
const body = document.body;

function playSound(color) {
  // Optional: play sound for each color
  // Can be added by linking audio files and playing here
}

function gameFlash(btn) {
  btn.classList.add("flash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  playSound(btn.id);
  setTimeout(() => btn.classList.remove("userflash"), 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  // Generate new random color
  const randIdx = Math.floor(Math.random() * btns.length);
  const randColor = btns[randIdx];
  gameSeq.push(randColor);

  // Flash the sequence with delays
  let delay = 500;
  gameSeq.forEach((color, idx) => {
    setTimeout(() => {
      const btn = document.getElementById(color);
      gameFlash(btn);
    }, delay * (idx + 1));
  });
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  h2.innerHTML = `Game Over! Your Score was <b>${level}</b><br>Press any key to restart.`;
  body.classList.add("game-over");

  setTimeout(() => {
    body.classList.remove("game-over");
  }, 500);

  reset();
}

function reset() {
  started = false;
  level = 0;
  gameSeq.length = 0;
  userSeq.length = 0;
}

function btnPress(event) {
  if (!started) return; // ignore clicks if game not started

  const btn = event.target;
  userFlash(btn);

  const userColor = btn.id;
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

// Start game on any key press
document.addEventListener("keydown", () => {
  if (!started) {
    started = true;
    levelUp();
    h2.style.color = "#333";
  }
});

// Add click listeners to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", btnPress);
});
