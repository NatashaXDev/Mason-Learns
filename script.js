// Mason Learns Educational App
class MasonLearns {
  constructor() {
    this.currentScreen = "home";
    this.stars = parseInt(localStorage.getItem("masonStars") || "0");
    this.sectionProgress = JSON.parse(
      localStorage.getItem("masonProgress") || "{}"
    );
    this.init();
  }

  init() {
    this.updateStarsDisplay();
    this.setupNavigation();
    this.setupSections();
    this.createNumbersGrid();
    this.createAlphabetGrid();
    this.addLoadAnimations();
  }

  // Add entrance animations
  addLoadAnimations() {
    const navButtons = document.querySelectorAll(".nav-button");
    navButtons.forEach((button, index) => {
      button.style.animationDelay = `${index * 0.2}s`;
    });

    // Animate avatar entrance
    const avatar = document.querySelector(".mason-avatar");
    if (avatar) {
      avatar.style.animation = "slideUp 1s ease-out 0.5s both";
    }
  }

  // Navigation Management
  setupNavigation() {
    // Home navigation buttons
    document.querySelectorAll(".nav-button").forEach((button) => {
      button.addEventListener("click", (e) => {
        const section = e.currentTarget.dataset.section;
        this.showScreen(section);
        this.addBounceEffect(e.currentTarget);
      });
    });

    // Back buttons
    document.querySelectorAll(".back-button").forEach((button) => {
      button.addEventListener("click", () => {
        this.showScreen("home");
      });
    });
  }

  showScreen(screenName) {
    // Hide all screens
    document.querySelectorAll(".screen").forEach((screen) => {
      screen.classList.remove("active");
    });

    // Show target screen
    const targetScreen = document.getElementById(`${screenName}-screen`);
    if (targetScreen) {
      targetScreen.classList.add("active");
      this.currentScreen = screenName;
      this.updateSectionStars(screenName);
    }
  }

  // Section Setup
  setupSections() {
    this.setupShapes();
    this.setupColors();
  }

  setupShapes() {
    document.querySelectorAll(".shape-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const shape = e.currentTarget.dataset.shape;
        this.handleShapeClick(shape, e.currentTarget);
      });
    });
  }

  setupColors() {
    document.querySelectorAll(".color-item").forEach((item) => {
      item.addEventListener("click", (e) => {
        const color = e.currentTarget.dataset.color;
        this.handleColorClick(color, e.currentTarget);
      });
    });
  }

  createNumbersGrid() {
    const numbersGrid = document.getElementById("numbers-grid");

    for (let i = 1; i <= 20; i++) {
      const numberItem = document.createElement("div");
      numberItem.className = "learning-item number-item";
      numberItem.dataset.number = i;

      numberItem.innerHTML = `
                <div class="number-display">${i}</div>
                <div class="item-label">${this.numberToWord(i)}</div>
            `;

      numberItem.addEventListener("click", (e) => {
        this.handleNumberClick(i, e.currentTarget);
      });

      numbersGrid.appendChild(numberItem);
    }
  }

  createAlphabetGrid() {
    const alphabetGrid = document.getElementById("alphabet-grid");

    for (let i = 0; i < 26; i++) {
      const letter = String.fromCharCode(65 + i); // A-Z
      const letterItem = document.createElement("div");
      letterItem.className = "learning-item letter-item";
      letterItem.dataset.letter = letter;

      letterItem.innerHTML = `
                <div class="letter-display">${letter}</div>
                <div class="item-label">${letter.toLowerCase()}</div>
            `;

      letterItem.addEventListener("click", (e) => {
        this.handleLetterClick(letter, e.currentTarget);
      });

      alphabetGrid.appendChild(letterItem);
    }
  }

  // Interaction Handlers
  handleShapeClick(shape, element) {
    this.addClickedEffect(element);
    this.showFeedback(`Great job! That's a ${shape}! 🎉`);
    this.addStar("shapes");
    this.createConfetti();

    // Special shape animations
    const shapeElement = element.querySelector(".shape");
    if (shape === "circle") {
      shapeElement.classList.add("pulse");
    } else if (shape === "triangle") {
      shapeElement.classList.add("wiggle");
    } else {
      shapeElement.classList.add("rainbow");
    }

    setTimeout(() => {
      shapeElement.classList.remove("pulse", "wiggle", "rainbow");
    }, 2000);
  }

  handleColorClick(color, element) {
    this.addClickedEffect(element);
    this.showFeedback(`Awesome! That's ${color}! 🌈`);
    this.addStar("colors");
    this.createConfetti();

    // Make the color block glow
    const colorBlock = element.querySelector(".color-block");
    colorBlock.style.boxShadow = `0 0 20px ${this.getColorHex(color)}`;

    setTimeout(() => {
      colorBlock.style.boxShadow = "";
    }, 2000);
  }

  handleNumberClick(number, element) {
    this.addClickedEffect(element);
    this.showFeedback(`Amazing! That's number ${number}! 🔢`);
    this.addStar("numbers");
    this.createConfetti();

    // Animate the number
    const numberDisplay = element.querySelector(".number-display");
    numberDisplay.classList.add("wiggle");

    setTimeout(() => {
      numberDisplay.classList.remove("wiggle");
    }, 1000);
  }

  handleLetterClick(letter, element) {
    this.addClickedEffect(element);
    this.showFeedback(`Fantastic! That's the letter ${letter}! 📚`);
    this.addStar("alphabet");
    this.createConfetti();

    // Animate the letter
    const letterDisplay = element.querySelector(".letter-display");
    letterDisplay.classList.add("pulse");

    setTimeout(() => {
      letterDisplay.classList.remove("pulse");
    }, 1000);
  }

  // Visual Effects
  addClickedEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => {
      element.classList.remove("clicked");
    }, 600);
  }

  addBounceEffect(element) {
    element.style.animation = "none";
    element.offsetHeight; // Trigger reflow
    element.style.animation = "bounce 0.6s ease-in-out";

    setTimeout(() => {
      element.style.animation = "";
    }, 600);
  }

  showFeedback(message) {
    const feedbackElement = document.getElementById("feedback-text");
    feedbackElement.textContent = message;
    feedbackElement.classList.add("show");

    setTimeout(() => {
      feedbackElement.classList.remove("show");
    }, 1500);
  }

  createConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#ff9ff3",
      "#54a0ff",
      "#ffd700",
      "#ff6348",
    ];

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 1 + "s";
      confetti.style.animationDuration = Math.random() * 1.5 + 2.5 + "s";
      confetti.style.width = Math.random() * 8 + 6 + "px";
      confetti.style.height = confetti.style.width;

      container.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }

  // Progress and Rewards System
  addStar(section) {
    this.stars++;

    // Track section progress
    if (!this.sectionProgress[section]) {
      this.sectionProgress[section] = 0;
    }
    this.sectionProgress[section]++;

    this.updateStarsDisplay();
    this.saveProgress();

    // Special milestone celebrations
    if (this.stars % 10 === 0) {
      this.showFeedback(
        `🎉 WOW! ${this.stars} STARS! You're amazing, Mason! 🎉`
      );
      this.createMegaConfetti();
    }
  }

  updateStarsDisplay() {
    const totalStarsElement = document.getElementById("total-stars");
    if (totalStarsElement) {
      totalStarsElement.textContent = this.stars;
      totalStarsElement.classList.add("star-earned");
      setTimeout(() => {
        totalStarsElement.classList.remove("star-earned");
      }, 1000);
    }
  }

  updateSectionStars(section) {
    const sectionStarElements = document.querySelectorAll(
      ".section-star-count"
    );
    sectionStarElements.forEach((element) => {
      element.textContent = this.sectionProgress[section] || 0;
    });
  }

  createMegaConfetti() {
    const container = document.getElementById("confetti-container");
    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#f9ca24",
      "#ff9ff3",
      "#54a0ff",
      "#ffd700",
      "#ff6348",
    ];

    for (let i = 0; i < 80; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.background =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
      confetti.style.width = Math.random() * 12 + 8 + "px";
      confetti.style.height = confetti.style.width;

      // Add some special shapes
      if (Math.random() > 0.7) {
        confetti.style.borderRadius = "0";
        confetti.style.transform = "rotate(45deg)";
      }

      container.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 7000);
    }
  }

  // Utility Functions
  numberToWord(num) {
    const words = {
      1: "One",
      2: "Two",
      3: "Three",
      4: "Four",
      5: "Five",
      6: "Six",
      7: "Seven",
      8: "Eight",
      9: "Nine",
      10: "Ten",
      11: "Eleven",
      12: "Twelve",
      13: "Thirteen",
      14: "Fourteen",
      15: "Fifteen",
      16: "Sixteen",
      17: "Seventeen",
      18: "Eighteen",
      19: "Nineteen",
      20: "Twenty",
    };
    return words[num] || num.toString();
  }

  getColorHex(color) {
    const colors = {
      red: "#ff4757",
      blue: "#3742fa",
      green: "#2ed573",
      yellow: "#ffa502",
      purple: "#8e44ad",
      orange: "#ff6348",
      pink: "#ff3838",
      brown: "#8b4513",
    };
    return colors[color] || "#000";
  }

  saveProgress() {
    localStorage.setItem("masonStars", this.stars.toString());
    localStorage.setItem("masonProgress", JSON.stringify(this.sectionProgress));
  }

  // Special Encouragement
  giveEncouragement() {
    const encouragements = [
      "You're doing great, Mason! 🌟",
      "Keep learning, superstar! ⭐",
      "Amazing work! 🎉",
      "You're so smart! 🧠",
      "Fantastic job! 👏",
      "You're learning so much! 📚",
    ];

    const randomEncouragement =
      encouragements[Math.floor(Math.random() * encouragements.length)];
    this.showFeedback(randomEncouragement);
  }
}

// Initialize the app when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const app = new MasonLearns();

  // Add some initial encouragement
  setTimeout(() => {
    const feedback = document.getElementById("feedback-text");
    feedback.textContent = "Hi Mason! Ready to learn and have fun? 🎈";
    feedback.classList.add("show");

    setTimeout(() => {
      feedback.classList.remove("show");
    }, 3500);
  }, 1500);
});

// Add some fun Easter eggs for Mason
document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    // Create a temporary instance just for the confetti effect
    const tempApp = new MasonLearns();
    tempApp.createMegaConfetti();
    tempApp.showFeedback("Surprise mega confetti for Mason! 🎊✨");
  }
});

// Touch-friendly interactions
document.addEventListener("touchstart", function () {}, { passive: true });

// Add some magical sparkles on mouse movement (for desktop)
document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.95) {
    // Only occasionally
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.left = e.clientX + "px";
    sparkle.style.top = e.clientY + "px";
    sparkle.style.pointerEvents = "none";
    sparkle.style.fontSize = "1rem";
    sparkle.style.zIndex = "999";
    sparkle.textContent = "✨";
    sparkle.style.animation = "twinkle 1s ease-out forwards";

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 1000);
  }
});
