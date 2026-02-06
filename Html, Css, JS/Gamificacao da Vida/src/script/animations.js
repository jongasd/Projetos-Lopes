// Animations and Visual Effects
class Animations {
  // Level up animation
  static levelUp() {
    const overlay = document.createElement("div");
    overlay.className = "levelup-overlay";
    overlay.innerHTML = `
      <div class="levelup-content">
        <div class="levelup-stars">⭐⭐⭐</div>
        <h1 class="levelup-title">LEVEL UP!</h1>
        <div class="levelup-particles"></div>
      </div>
    `;

    document.body.appendChild(overlay);

    // Create particles
    const particlesContainer = overlay.querySelector(".levelup-particles");
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement("div");
      particle.className = "levelup-particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 0.5 + "s";
      particle.textContent = ["⭐", "✨", "💫", "🌟"][
        Math.floor(Math.random() * 4)
      ];
      particlesContainer.appendChild(particle);
    }

    setTimeout(() => {
      overlay.classList.add("levelup-show");
    }, 10);

    setTimeout(() => {
      overlay.classList.remove("levelup-show");
      setTimeout(() => {
        document.body.removeChild(overlay);
      }, 500);
    }, 3000);
  }

  // Confetti animation
  static confetti() {
    const colors = [
      "#ff0000",
      "#00ff00",
      "#0000ff",
      "#ffff00",
      "#ff00ff",
      "#00ffff",
    ];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 3 + "s";
      confetti.style.animationDuration = Math.random() * 3 + 2 + "s";

      document.body.appendChild(confetti);

      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 5000);
    }
  }

  // Coin collect animation
  static collectCoins(amount, targetElement) {
    const coins = [];
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 2;

    for (let i = 0; i < Math.min(amount, 10); i++) {
      const coin = document.createElement("div");
      coin.className = "coin-collect";
      coin.innerHTML = "🪙";
      coin.style.left = startX + "px";
      coin.style.top = startY + "px";

      document.body.appendChild(coin);
      coins.push(coin);

      const targetRect = targetElement.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;

      setTimeout(() => {
        coin.style.transform = `translate(${targetX - startX}px, ${targetY - startY}px) scale(0)`;
        coin.style.opacity = "0";
      }, i * 50);

      setTimeout(
        () => {
          document.body.removeChild(coin);
        },
        1000 + i * 50,
      );
    }
  }

  // XP gain animation
  static xpGain(amount, element) {
    const xpText = document.createElement("div");
    xpText.className = "xp-gain-text";
    xpText.textContent = `+${amount} XP`;

    const rect = element.getBoundingClientRect();
    xpText.style.left = rect.left + rect.width / 2 + "px";
    xpText.style.top = rect.top + "px";

    document.body.appendChild(xpText);

    setTimeout(() => {
      xpText.classList.add("xp-gain-animate");
    }, 10);

    setTimeout(() => {
      document.body.removeChild(xpText);
    }, 2000);
  }

  // Shake animation
  static shake(element) {
    element.classList.add("shake-animation");
    setTimeout(() => {
      element.classList.remove("shake-animation");
    }, 500);
  }

  // Pulse animation
  static pulse(element) {
    element.classList.add("pulse-animation");
    setTimeout(() => {
      element.classList.remove("pulse-animation");
    }, 1000);
  }

  // Fade in
  static fadeIn(element, duration = 300) {
    element.style.opacity = "0";
    element.style.display = "block";

    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 50 / duration;
      element.style.opacity = opacity;

      if (opacity >= 1) {
        clearInterval(timer);
        element.style.opacity = "1";
      }
    }, 50);
  }

  // Fade out
  static fadeOut(element, duration = 300) {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 50 / duration;
      element.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(timer);
        element.style.display = "none";
        element.style.opacity = "0";
      }
    }, 50);
  }

  // Slide in from bottom
  static slideInBottom(element) {
    element.style.transform = "translateY(100%)";
    element.style.opacity = "0";

    setTimeout(() => {
      element.style.transition = "transform 0.3s ease, opacity 0.3s ease";
      element.style.transform = "translateY(0)";
      element.style.opacity = "1";
    }, 10);
  }

  // Slide out to bottom
  static slideOutBottom(element, callback) {
    element.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    element.style.transform = "translateY(100%)";
    element.style.opacity = "0";

    setTimeout(() => {
      if (callback) callback();
    }, 300);
  }

  // Number count up animation
  static countUp(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // Progress bar animation
  static animateProgress(element, targetPercent, duration = 1000) {
    const startPercent = parseFloat(element.style.width) || 0;
    const range = targetPercent - startPercent;
    const increment = range / (duration / 16);
    let current = startPercent;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetPercent) {
        current = targetPercent;
        clearInterval(timer);
      }
      element.style.width = current + "%";
    }, 16);
  }

  // Ripple effect
  static ripple(element, event) {
    const ripple = document.createElement("span");
    ripple.className = "ripple-effect";

    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    element.appendChild(ripple);

    setTimeout(() => {
      element.removeChild(ripple);
    }, 600);
  }

  // Sparkle effect
  static sparkle(element) {
    const sparkleCount = 5;

    for (let i = 0; i < sparkleCount; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      sparkle.textContent = "✨";

      const rect = element.getBoundingClientRect();
      const x = Math.random() * rect.width;
      const y = Math.random() * rect.height;

      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";

      element.appendChild(sparkle);

      setTimeout(() => {
        element.removeChild(sparkle);
      }, 1000);
    }
  }

  // Typewriter effect
  static typewriter(element, text, speed = 50) {
    element.textContent = "";
    let i = 0;

    const timer = setInterval(() => {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }
}
