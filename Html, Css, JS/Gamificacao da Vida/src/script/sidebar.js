document.addEventListener("DOMContentLoaded", () => {
  // Elementos
  const menuBtn = document.getElementById("menu-toggle-btn");
  const closeBtn = document.getElementById("close-sidebar-btn");
  const sidebar = document.getElementById("mySidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const logoutBtn = document.getElementById("logout-btn");

  // Função para abrir
  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  }

  // Função para fechar
  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  }

  // Eventos
  if (menuBtn) menuBtn.addEventListener("click", openSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar); // Fecha ao clicar fora

  // --- CARREGAR DADOS DO USUÁRIO ---
  const userName = localStorage.getItem("userName") || "Heroi";
  const userLvl = localStorage.getItem("gameLevel") || 1;

  const sidebarName = document.getElementById("sidebar-name");
  const sidebarLevel = document.getElementById("sidebar-level");

  if (sidebarName) sidebarName.innerText = userName;
  if (sidebarLevel) sidebarLevel.innerText = `Nível ${userLvl}`;

  // --- LOGOUT ---
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Sair da conta?")) {
        // localStorage.clear(); // Opcional
        window.location.href = "index.html";
      }
    });
  }
});
