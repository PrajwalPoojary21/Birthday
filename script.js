const confettiLayer = document.querySelector("#confettiLayer");
const confettiButton = document.querySelector("#confettiButton");
const certificateConfetti = document.querySelector("#certificateConfetti");
const birthdayDialog = document.querySelector("#birthdayDialog");
const openLetterButton = document.querySelector("#openLetterButton");
const closeDialog = document.querySelector("#closeDialog");
const dialogCelebrate = document.querySelector("#dialogCelebrate");
const toast = document.querySelector("#toast");
const riddleCards = [...document.querySelectorAll(".riddle-card")];
const progressDots = [...document.querySelectorAll(".progress-dot")];
const candles = [...document.querySelectorAll(".candle")];
const candleCounter = document.querySelector("#candleCounter");

const colors = ["#f39ab6", "#e86669", "#f6c85f", "#8fc8dc", "#88b98c", "#fffdf6"];
let currentRiddle = 0;
let toastTimer;

function celebrate(amount = 70) {
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement("span");
    const size = 6 + Math.random() * 8;
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * (0.7 + Math.random())}px`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.borderRadius = Math.random() > 0.55 ? "50%" : "2px";
    piece.style.setProperty("--drift", `${-110 + Math.random() * 220}px`);
    piece.style.setProperty("--spin", `${360 + Math.random() * 720}deg`);
    piece.style.setProperty("--fall-time", `${2.4 + Math.random() * 2.5}s`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    confettiLayer.append(piece);
    window.setTimeout(() => piece.remove(), 5400);
  }
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function openBirthdayLetter() {
  birthdayDialog.showModal();
  celebrate(45);
}

function advanceRiddle() {
  const activeCard = riddleCards[currentRiddle];
  const nextCard = riddleCards[currentRiddle + 1];

  activeCard.hidden = true;
  activeCard.classList.remove("active");
  currentRiddle += 1;
  nextCard.hidden = false;
  nextCard.classList.add("active", "entering");

  progressDots.forEach((dot, index) => {
    dot.classList.toggle("active", index <= currentRiddle);
  });

  window.setTimeout(() => nextCard.classList.remove("entering"), 500);
}

document.querySelectorAll(".answer-options").forEach((optionGroup) => {
  optionGroup.addEventListener("click", (event) => {
    const answer = event.target.closest("button[data-answer]");
    if (!answer) return;

    const card = answer.closest(".riddle-card");
    const feedback = card.querySelector(".answer-feedback");

    if (answer.dataset.answer === "correct") {
      optionGroup.querySelectorAll("button").forEach((button) => {
        button.disabled = true;
      });
      answer.style.background = "#dcefdc";
      feedback.textContent = "Exactly right! Clever sister detected.";
      showToast(currentRiddle === 2 ? "All three solved! Surprise unlocked ★" : "Correct! One step closer ✦");
      celebrate(currentRiddle === 2 ? 55 : 18);
      window.setTimeout(advanceRiddle, 850);
      return;
    }

    answer.classList.remove("wrong");
    void answer.offsetWidth;
    answer.classList.add("wrong");
    feedback.textContent = "Cute guess! Try one more time.";
  });
});

function updateCandleCounter() {
  const remaining = candles.filter((candle) => !candle.classList.contains("blown")).length;

  if (remaining > 1) {
    candleCounter.textContent = `${remaining} candles still glowing`;
  } else if (remaining === 1) {
    candleCounter.textContent = "Just 1 candle left...";
  } else {
    candleCounter.textContent = "Wish made! May every bit of it come true ♥";
    showToast("Your birthday wish is on its way ✦");
    celebrate(120);
  }
}

candles.forEach((candle) => {
  candle.addEventListener("click", () => {
    if (candle.classList.contains("blown")) return;
    candle.classList.add("blown");
    candle.setAttribute("aria-label", "Candle blown out");
    updateCandleCounter();
  });
});

confettiButton.addEventListener("click", () => {
  celebrate(90);
  showToast("Excellent button pressing, birthday crew!");
});

certificateConfetti.addEventListener("click", () => {
  celebrate(120);
  showToast("Honor accepted. Certificate is now extremely official.");
});

openLetterButton.addEventListener("click", openBirthdayLetter);
closeDialog.addEventListener("click", () => birthdayDialog.close());

dialogCelebrate.addEventListener("click", () => {
  celebrate(130);
  birthdayDialog.close();
  showToast("Happy Birthday, BigSiss!!!");
});

birthdayDialog.addEventListener("click", (event) => {
  const dialogBounds = birthdayDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < dialogBounds.left ||
    event.clientX > dialogBounds.right ||
    event.clientY < dialogBounds.top ||
    event.clientY > dialogBounds.bottom;

  if (clickedOutside) birthdayDialog.close();
});

window.addEventListener("load", () => {
  window.setTimeout(() => celebrate(35), 500);
});
