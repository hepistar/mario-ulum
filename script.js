const mario = document.getElementById("mario");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let level = 1;
let obstacleSpeed = 2;

// Function to make Mario jump
function jump() {
  if (isJumping) return;

  isJumping = true;
  mario.style.transition = "bottom 0.5s";
  mario.style.bottom = "120px";

  setTimeout(() => {
    mario.style.bottom = "20px";
    mario.style.transition = "bottom 0.5s";
    setTimeout(() => (isJumping = false), 500);
  }, 500);
}

// Check for collision
function checkCollision() {
  const marioRect = mario.getBoundingClientRect();
  const obstacleRect = obstacle.getBoundingClientRect();

  if (
    marioRect.right > obstacleRect.left &&
    marioRect.left < obstacleRect.right &&
    marioRect.bottom > obstacleRect.top
  ) {
    alert(`Game Over! Final Score: ${score} | Level: ${level}`);
    location.reload(); // Restart the game
  }
}

// Update score and increase level
function updateScore() {
  const obstacleLeft = parseInt(
    window.getComputedStyle(obstacle).getPropertyValue("right")
  );

  if (obstacleLeft > 790 && obstacleLeft < 800) {
    score++;
    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
  }

  // Increase level every 10 points
  if (score % 10 === 0 && score > 0) {
    level++;
    obstacleSpeed *= 0.9; // Speed up the obstacle
    obstacle.style.animationDuration = `${obstacleSpeed}s`;
    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
  }
}

// Game loop
function gameLoop() {
  checkCollision();
  updateScore();
  requestAnimationFrame(gameLoop);
}

// Event listener for jump
document.addEventListener("keydown", (event) => {
  if (event.key === " ") jump(); // Press Spacebar to jump
});

// Start the game
gameLoop();
