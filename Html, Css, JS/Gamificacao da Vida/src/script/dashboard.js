document.addEventListener("DOMContentLoaded", () => {
  // --- 1. RECUPERAR DADOS DO JOGADOR ---
  let xp = parseInt(localStorage.getItem("gameXP")) || 0;
  let level = parseInt(localStorage.getItem("gameLevel")) || 1;
  let coins = parseInt(localStorage.getItem("userCoins")) || 0;

  // Calcula XP para o próximo nível (Fórmula simples: Nível * 100)
  let nextLevelXp = level * 100;

  // Estimativa de Missões Feitas (Baseada no XP total, já que não temos contador específico ainda)
  // Assumindo média de 30 XP por missão
  let questsCompletedEstimate = Math.floor(xp / 30) + (level - 1) * 5;

  // --- 2. ATUALIZAR INTERFACE DA HOME (LOBBY) ---

  // Elementos da Hero Section (Index.html)
  const homeName = document.getElementById("home-player-name");
  const homeLevel = document.getElementById("home-level");
  const homeCoins = document.getElementById("home-coins");
  const homeQuests = document.getElementById("home-quests-done");

  // Se os elementos existirem (estamos na Home), atualiza
  if (homeLevel) homeLevel.innerText = `Nível ${level}`;
  if (homeCoins) homeCoins.innerText = `${coins} Moedas`;
  if (homeQuests) homeQuests.innerText = `~${questsCompletedEstimate} Missões`;

  // Saudação Personalizada baseada na hora
  if (homeName) {
    const hour = new Date().getHours();
    let greeting = "Heroi";
    if (hour < 12) greeting = "Heroi (Bom dia)";
    else if (hour < 18) greeting = "Heroi (Boa tarde)";
    else greeting = "Heroi (Boa noite)";

    // Se quiser salvar o nome do usuário futuramente, adicione lógica aqui
    // Por enquanto, usa o padrão ou o LocalStorage se existir
    const savedName = localStorage.getItem("userName");
    homeName.innerText = savedName ? savedName : greeting;
  }

  // --- 3. LOGICA LEGADA (CHECKBOXES NA HOME) ---
  // Caso você ainda tenha uma lista de checkboxes na home antiga ou queira usar no futuro
  const inputs = document.querySelectorAll(".quest-check");
  const progressBar = document.querySelector(".progress-fill");
  const currentXpText = document.querySelector(".current-xp");
  const levelDisplay = document.getElementById("level-display");

  function updateOldUI() {
    if (levelDisplay) levelDisplay.innerText = level;
    if (currentXpText) currentXpText.innerText = `${xp} / ${nextLevelXp} XP`;
    if (progressBar)
      progressBar.style.width = `${Math.min((xp / nextLevelXp) * 100, 100)}%`;
  }

  // Inicializa UI antiga se existir
  updateOldUI();

  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const reward = parseInt(this.getAttribute("data-xp"));

      if (this.checked) {
        // Ganhar XP
        xp += reward;
        // Ganhar Moedas (1 moeda por XP, por exemplo)
        coins += Math.floor(reward / 2);

        showToast(
          "Sucesso",
          `+${reward} XP | +${Math.floor(reward / 2)} Moedas`,
          "success"
        );

        // Lógica de Level Up
        if (xp >= nextLevelXp) {
          level++;
          xp -= nextLevelXp;
          nextLevelXp = level * 100;
          showToast(
            "Level Up!",
            `Parabéns! Você chegou ao nível ${level}`,
            "success"
          );
        }
      } else {
        // Remover XP se desmarcar
        xp -= reward;
        coins -= Math.floor(reward / 2);
        if (xp < 0) xp = 0;
        if (coins < 0) coins = 0;
      }

      // SALVAR TUDO
      localStorage.setItem("gameXP", xp);
      localStorage.setItem("gameLevel", level);
      localStorage.setItem("userCoins", coins);

      // Atualiza visual
      updateOldUI();

      // Atualiza também os badges da Home se estiverem visíveis
      if (homeLevel) homeLevel.innerText = `Nível ${level}`;
      if (homeCoins) homeCoins.innerText = `${coins} Moedas`;
    });
  });
});
