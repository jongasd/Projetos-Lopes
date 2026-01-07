document.addEventListener("DOMContentLoaded", () => {
  // 1. SINCRONIZAR COM O DASHBOARD
  let xp = parseInt(localStorage.getItem("gameXP")) || 0;
  let level = parseInt(localStorage.getItem("gameLevel")) || 1;
  let nextLevelXp = level * 100;

  const levelDisplay = document.getElementById("char-level-display");
  const xpDisplay = document.getElementById("char-xp-display");
  const progressBar = document.getElementById("char-progress-bar");

  if (levelDisplay) levelDisplay.innerText = level;
  if (xpDisplay) xpDisplay.innerText = `${xp} / ${nextLevelXp} XP`;
  if (progressBar)
    progressBar.style.width = `${Math.min((xp / nextLevelXp) * 100, 100)}%`;

  // 2. FOTO DE PERFIL
  const input = document.getElementById("file-input");
  const img = document.getElementById("profile-img");

  const saved = localStorage.getItem("avatar");
  if (saved && img) img.src = saved;

  if (input) {
    input.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          img.src = e.target.result;
          localStorage.setItem("avatar", e.target.result);
          showToast("Perfil", "Foto atualizada com sucesso!", "success");
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
});
