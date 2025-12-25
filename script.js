let lastTime;
import Bat from "./Bat";
import Ball from "./Ball";

let ball = new Ball(document.getElementById("ball"));
let batLeft = new Bat(document.getElementById("paddle-left"));
let batRight = new Bat(document.getElementById("paddle-right"));
let playerScore = document.getElementById("player-score");
let computerScore = document.getElementById("computer-score");

document.addEventListener("mousemove", (e) => {
  batLeft.pos = (e.y / innerHeight) * 100;
});

function update(time) {
  if (lastTime != null) {
    const paddleLeftRect = batLeft.rect();
    const paddleRightRect = batRight.rect();
    const delta = time - lastTime;
    ball.update(delta, paddleLeftRect, paddleRightRect);
    batRight.update(delta, ball.y);
  }

  if (isLose()) {
    const rect = ball.rect();
    if (rect.left <= 0) {
      computerScore.textContent = parseInt(computerScore.textContent) + 1;
    } else {
      playerScore.textContent = parseInt(playerScore.textContent) + 1;
    }
    ball.setup();
  }

  lastTime = time;
  window.requestAnimationFrame(update);
}

function isLose() {
  const rect = ball.rect();
  return rect.left <= 0 || rect.right >= window.innerWidth;
}
window.requestAnimationFrame(update);
