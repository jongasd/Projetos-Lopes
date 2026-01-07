document.addEventListener("DOMContentLoaded", () => {
  // Carregar Gráfico XP
  const container = document.getElementById("xp-bar-chart");
  if (container) {
    // Limpa caso tenha algo
    container.innerHTML = "";

    const data = [
      { day: "Seg", val: 20 },
      { day: "Ter", val: 50 },
      { day: "Qua", val: 80 },
      { day: "Qui", val: 40 },
      { day: "Sex", val: 90 },
      { day: "Sab", val: 30 },
      { day: "Dom", val: 60 },
    ];

    data.forEach((item) => {
      const bar = document.createElement("div");
      bar.className = "bar";

      // Valor numérico dentro da barra
      const valueSpan = document.createElement("div");
      valueSpan.className = "bar-value";
      valueSpan.innerText = item.val;

      // Texto do dia
      const daySpan = document.createElement("span");
      daySpan.innerText = item.day;
      daySpan.style.marginTop = "5px";
      daySpan.style.fontSize = "0.8rem";

      bar.appendChild(valueSpan);
      bar.appendChild(daySpan); // Adiciona texto do dia visualmente se quiser, ou usa CSS

      // Animação de altura
      bar.style.height = "0%";
      setTimeout(() => (bar.style.height = item.val + "%"), 100);

      container.appendChild(bar);
    });
  }

  // Carregar Heatmap com Tooltips melhores
  const grid = document.getElementById("heatmap-grid");
  if (grid) {
    grid.innerHTML = ""; // Limpa
    for (let i = 0; i < 30; i++) {
      const div = document.createElement("div");
      div.className = "heatmap-day";
      const missions = Math.floor(Math.random() * 5); // 0 a 4 missoes

      // Define cor baseada na quantidade
      if (missions > 0) div.classList.add("level-1");
      if (missions > 2) div.classList.remove("level-1");
      div.classList.add("level-2");
      if (missions > 4) div.classList.remove("level-2");
      div.classList.add("level-3");

      // Mostra valor ao passar o mouse (Nativo do navegador)
      div.title = `Dia ${i + 1}: ${missions} missões completas`;

      grid.appendChild(div);
    }
  }
});
