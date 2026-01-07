document.addEventListener("DOMContentLoaded", () => {
  // --- BOSS BATTLE ---
  const bossCheckboxes = document.querySelectorAll(".boss-checkbox");
  const bossHpFill = document.getElementById("boss-hp-bar");
  const bossHpText = document.getElementById("boss-hp-current");
  const maxHp = 10000;

  if (bossCheckboxes.length > 0) {
    function updateBossHp() {
      let currentDamage = 0;
      bossCheckboxes.forEach((box) => {
        if (box.checked) {
          currentDamage += parseInt(box.getAttribute("data-dmg"));
          box.parentElement.classList.add("completed");
        } else {
          box.parentElement.classList.remove("completed");
        }
      });

      let currentHp = maxHp - currentDamage;
      if (currentHp < 0) currentHp = 0;

      if (bossHpText) bossHpText.innerText = currentHp.toLocaleString();
      if (bossHpFill) {
        const percentage = (currentHp / maxHp) * 100;
        bossHpFill.style.width = percentage + "%";
        if (percentage === 0) bossHpFill.style.background = "transparent";
      }
    }
    bossCheckboxes.forEach((box) =>
      box.addEventListener("change", updateBossHp)
    );
    updateBossHp();
  }

  // --- TUTORIAL MODAL ---
  const modal = document.getElementById("tutorial-modal");
  const openBtn = document.getElementById("open-tutorial-btn");
  const closeBtn = document.getElementById("close-tutorial");

  if (modal && openBtn && closeBtn) {
    openBtn.addEventListener("click", () => modal.classList.add("open"));
    closeBtn.addEventListener("click", () => modal.classList.remove("open"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }
});
