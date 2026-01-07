document.addEventListener("DOMContentLoaded", () => {
  const btnCreate = document.getElementById("btn-create-quest");
  const grid = document.getElementById("dynamic-quest-grid");

  // Funcionalidade dos botões "Concluir" já existentes
  document.querySelectorAll(".btn-complete").forEach((btn) => {
    btn.addEventListener("click", function () {
      // Pega o XP do elemento <strong> vizinho
      const xpText = this.parentElement.querySelector("strong").innerText;
      const xpVal = parseInt(xpText.replace(/\D/g, "")); // Extrai só o numero

      // Atualiza XP Global
      let currentXP = parseInt(localStorage.getItem("gameXP")) || 0;
      currentXP += xpVal;
      localStorage.setItem("gameXP", currentXP);

      showToast("Missão Cumprida", `+${xpVal} XP adicionados!`, "success");

      // Remove o card visualmente
      const card = this.closest(".quest-card");
      card.style.opacity = "0.5";
      card.style.pointerEvents = "none";
      this.innerText = "Feito";
    });
  });

  // Criar Nova Missão
  if (btnCreate) {
    btnCreate.addEventListener("click", () => {
      const name = document.getElementById("quest-name").value;
      const category = document.getElementById("quest-category").value; // Pega Categoria
      const xp = document.querySelector(
        'input[name="difficulty"]:checked'
      ).value;

      if (!name) {
        showToast("Erro", "Digite o nome da missão", "error");
        return;
      }

      // Cria o Card HTML
      const div = document.createElement("div");
      div.className = "quest-card";

      // Define cor da tag baseada na categoria
      let color = "#fff";
      if (category === "Saúde") color = "var(--success)";
      if (category === "Trabalho") color = "var(--warning)";
      if (category === "Estudo") color = "var(--primary)";

      div.innerHTML = `
                <div>
                    <span class="quest-tag" style="color: ${color}">${category}</span>
                    <h4>${name}</h4>
                    <p style="font-size: 0.9rem;">Missão personalizada criada por você.</p>
                </div>
                <div class="quest-footer">
                    <strong style="color: var(--warning)">+${xp} XP</strong>
                    <button class="btn-complete-dynamic btn-complete">Concluir</button>
                </div>
            `;

      grid.appendChild(div);

      // Adiciona evento ao botão do card novo
      const newBtn = div.querySelector(".btn-complete-dynamic");
      newBtn.addEventListener("click", function () {
        let currentXP = parseInt(localStorage.getItem("gameXP")) || 0;
        currentXP += parseInt(xp);
        localStorage.setItem("gameXP", currentXP);
        showToast("Missão Cumprida", `+${xp} XP`, "success");
        div.style.opacity = "0.5";
        this.innerText = "Feito";
      });

      document.getElementById("quest-name").value = "";
    });
  }
});
