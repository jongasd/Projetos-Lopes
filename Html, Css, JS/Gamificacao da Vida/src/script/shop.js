document.addEventListener("DOMContentLoaded", () => {
  // 1. CARREGAR MOEDAS
  let coins = parseInt(localStorage.getItem("userCoins")) || 450;
  const display = document.getElementById("coin-display");
  if (display) display.innerText = coins;

  // 2. FUNÇÃO DE COMPRAR (Aplicada a todos os botões existentes e novos)
  function attachBuyEvent(button) {
    button.addEventListener("click", function () {
      const priceText =
        this.parentElement.querySelector(".item-price").innerText;
      const price = parseInt(priceText.replace(/\D/g, ""));

      if (coins >= price) {
        coins -= price;
        localStorage.setItem("userCoins", coins);
        if (display) display.innerText = coins;

        showToast("Compra realizada", "Aproveite sua recompensa!", "success");
        this.innerText = "Resgatado";
        this.disabled = true;
        this.style.background = "#333";
      } else {
        showToast("Erro", "Moedas insuficientes", "error");
      }
    });
  }

  // Aplica aos botões que já existem no HTML
  document
    .querySelectorAll(".shop-item button")
    .forEach((btn) => attachBuyEvent(btn));

  // 3. CRIAR NOVA RECOMPENSA
  const btnCreate = document.getElementById("btn-create-reward");
  if (btnCreate) {
    btnCreate.addEventListener("click", () => {
      const name = document.getElementById("reward-name").value;
      const price = document.getElementById("reward-price").value;
      const grid = document.getElementById("shop-grid");

      if (!name || !price) {
        showToast("Erro", "Preencha nome e preço", "error");
        return;
      }

      const div = document.createElement("div");
      div.className = "card shop-item";
      div.innerHTML = `
                <div style="font-size: 2rem; margin-bottom: 10px;">🎁</div>
                <h3>${name}</h3>
                <p>Recompensa personalizada.</p>
                <div class="item-price">💰 ${price}</div>
                <button style="width: 100%; margin-top: 10px;">Comprar</button>
            `;

      grid.appendChild(div);

      // Adiciona lógica de compra ao novo botão
      attachBuyEvent(div.querySelector("button"));

      document.getElementById("reward-name").value = "";
      document.getElementById("reward-price").value = "";
      showToast("Loja", "Nova recompensa adicionada!", "success");
    });
  }
});
