// Dashboard Controller - Main page logic
class Dashboard {
  constructor() {
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;

    // Show loading screen
    this.showLoading();

    try {
      // Initialize game engine
      await gameEngine.init();

      // Load all dashboard sections
      await this.loadAllSections();

      // Setup event listeners
      this.setupEventListeners();

      // Hide loading screen
      this.hideLoading();

      this.initialized = true;

      // Welcome notification
      this.showWelcome();
    } catch (error) {
      console.error("Dashboard initialization error:", error);
      Notifications.error("Erro ao carregar o dashboard");
      this.hideLoading();
    }
  }

  showLoading() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "flex";
    }
  }

  hideLoading() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 300);
      }, 500);
    }
  }

  async loadAllSections() {
    // Update header
    this.updateHeader();

    // Update hero section
    this.updateHeroSection();

    // Load daily quest
    await this.loadDailyQuest();

    // Load active quests
    this.loadActiveQuests();

    // Load ranking preview
    this.loadRankingPreview();

    // Load guild info
    this.loadGuildInfo();

    // Load character stats
    this.loadCharacterStats();

    // Load achievements
    this.loadAchievements();

    // Load statistics
    this.loadStatistics();
  }

  updateHeader() {
    const stats = gameEngine.getPlayerStatsSummary();

    // Update level in header
    const headerLevel = document.getElementById("header-level");
    if (headerLevel) {
      headerLevel.textContent = `Lvl ${stats.level}`;
    }

    // Update XP progress bar
    const xpFill = document.getElementById("xp-progress-fill");
    const xpText = document.getElementById("xp-text");

    if (xpFill && xpText) {
      Animations.animateProgress(xpFill, stats.xpPercentage);
      xpText.textContent = `${stats.xp} / ${stats.xpToNextLevel} XP`;
    }

    // Update sidebar
    const sidebarName = document.getElementById("sidebar-name");
    const sidebarLevel = document.getElementById("sidebar-level");
    const sidebarLevelNum = document.getElementById("sidebar-level-num");
    const sidebarCoins = document.getElementById("sidebar-coins");

    if (sidebarName) sidebarName.textContent = gameEngine.player.name;
    if (sidebarLevel) sidebarLevel.textContent = `Lvl ${stats.level}`;
    if (sidebarLevelNum) sidebarLevelNum.textContent = stats.level;
    if (sidebarCoins) sidebarCoins.textContent = stats.coins;

    // Update pending quests badge
    const pendingBadge = document.getElementById("pending-quests-badge");
    if (pendingBadge) {
      const activeCount = gameEngine.getActiveQuests().length;
      pendingBadge.textContent = activeCount;
      pendingBadge.style.display = activeCount > 0 ? "inline-block" : "none";
    }
  }

  updateHeroSection() {
    const stats = gameEngine.getPlayerStatsSummary();

    const playerName = document.getElementById("home-player-name");
    const homeLevel = document.getElementById("home-level");
    const homeCoins = document.getElementById("home-coins");
    const homeStreak = document.getElementById("home-streak");

    if (playerName) playerName.textContent = gameEngine.player.name;
    if (homeLevel) homeLevel.textContent = `Nível ${stats.level}`;
    if (homeCoins)
      homeCoins.textContent = `${Utils.formatNumber(stats.coins)} Moedas`;
    if (homeStreak) homeStreak.textContent = `${stats.streak} dias`;
  }

  async loadDailyQuest() {
    const dailyQuest = Storage.get("dailyQuest");
    const container = document.getElementById("daily-quest-card");

    if (!container) return;

    if (!dailyQuest) {
      container.innerHTML =
        '<p style="text-align: center; color: var(--text-secondary);">Nenhuma missão diária disponível</p>';
      return;
    }

    const completed = dailyQuest.completed;

    container.innerHTML = `
      <div class="daily-quest-content">
        <div class="daily-quest-icon">${dailyQuest.icon}</div>
        <div class="daily-quest-info">
          <h3>${dailyQuest.title}</h3>
          <p>${dailyQuest.description}</p>
          <div class="quest-rewards">
            <span class="reward-badge">
              <span class="material-icons-round">bolt</span>
              ${dailyQuest.xp} XP
            </span>
            <span class="reward-badge">
              <span class="material-icons-round">savings</span>
              ${dailyQuest.coins} Moedas
            </span>
          </div>
        </div>
        <button 
          class="btn-complete-daily ${completed ? "btn-completed" : "btn-primary"}" 
          ${completed ? "disabled" : ""}
          onclick="dashboard.completeDailyQuest()"
        >
          ${completed ? "✓ Completa" : "Completar"}
        </button>
      </div>
    `;
  }

  completeDailyQuest() {
    const dailyQuest = Storage.get("dailyQuest");

    if (!dailyQuest || dailyQuest.completed) return;

    dailyQuest.completed = true;
    Storage.set("dailyQuest", dailyQuest);

    gameEngine.addXp(dailyQuest.xp);
    gameEngine.addCoins(dailyQuest.coins);

    Notifications.success(
      `+${dailyQuest.xp} XP e +${dailyQuest.coins} moedas!`,
      "Missão Diária Completa! 🎉",
    );

    Animations.confetti();

    this.loadDailyQuest();
    this.updateHeader();
    this.updateHeroSection();
  }

  loadActiveQuests() {
    const container = document.getElementById("active-quests-container");
    if (!container) return;

    const activeQuests = gameEngine.getActiveQuests(6); // Show max 6

    if (activeQuests.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span style="font-size: 4rem;">📝</span>
          <h3>Nenhuma missão ativa</h3>
          <p>Crie sua primeira missão para começar!</p>
          <a href="quests.html" class="btn-primary">Criar Missão</a>
        </div>
      `;
      return;
    }

    container.innerHTML = activeQuests
      .map((quest) => this.createQuestCard(quest))
      .join("");
  }

  createQuestCard(quest) {
    const difficultyColor = Utils.getDifficultyColor(quest.difficulty);
    const categoryIcon = Utils.getCategoryIcon(quest.category);
    const dueDate = quest.dueDate ? Utils.formatDateShort(quest.dueDate) : null;
    const isOverdue = dueDate && Utils.isPast(quest.dueDate);

    return `
      <div class="quest-card" data-quest-id="${quest.id}">
        <div class="quest-header">
          <div class="quest-category">
            <span>${categoryIcon}</span>
            <span>${Utils.getCategoryLabel(quest.category)}</span>
          </div>
          <span class="quest-difficulty" style="background-color: ${difficultyColor}20; color: ${difficultyColor};">
            ${Utils.getDifficultyLabel(quest.difficulty)}
          </span>
        </div>
        <h3 class="quest-title">${Utils.escapeHtml(quest.title)}</h3>
        <p class="quest-description">${Utils.escapeHtml(quest.description)}</p>
        ${
          dueDate
            ? `
          <div class="quest-due-date ${isOverdue ? "overdue" : ""}">
            <span class="material-icons-round">schedule</span>
            ${isOverdue ? "Atrasada" : dueDate}
          </div>
        `
            : ""
        }
        <div class="quest-footer">
          <div class="quest-rewards">
            <span class="reward-icon">⚡ ${quest.xpReward} XP</span>
            <span class="reward-icon">🪙 ${quest.coinsReward}</span>
          </div>
          <button class="btn-complete-quest" onclick="dashboard.completeQuest('${quest.id}')">
            <span class="material-icons-round">check_circle</span>
            Completar
          </button>
        </div>
      </div>
    `;
  }

  completeQuest(questId) {
    const quest = gameEngine.completeQuest(questId);

    if (quest) {
      // Reload sections
      this.loadActiveQuests();
      this.updateHeader();
      this.updateHeroSection();
      this.loadStatistics();
      this.loadAchievements();

      // Animations
      Animations.confetti();
    }
  }

  loadRankingPreview() {
    const container = document.getElementById("ranking-preview");
    if (!container) return;

    // Mock ranking data
    const rankings = [
      {
        rank: 1,
        name: "DragonSlayer",
        level: 45,
        xp: 125000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
      },
      {
        rank: 2,
        name: "ShadowNinja",
        level: 42,
        xp: 118000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
      },
      {
        rank: 3,
        name: "MysticMage",
        level: 40,
        xp: 112000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
      },
      {
        rank: 4,
        name: gameEngine.player.name,
        level: gameEngine.player.level,
        xp: gameEngine.player.totalXpEarned,
        avatar: gameEngine.player.avatar,
      },
      {
        rank: 5,
        name: "IronKnight",
        level: 35,
        xp: 95000,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5",
      },
    ];

    container.innerHTML = `
      <div class="ranking-list">
        ${rankings
          .map(
            (player) => `
          <div class="ranking-item ${player.name === gameEngine.player.name ? "is-player" : ""}">
            <div class="rank-badge rank-${player.rank}">${player.rank}</div>
            <img src="${player.avatar}" alt="${player.name}" class="rank-avatar" />
            <div class="rank-info">
              <div class="rank-name">${player.name}</div>
              <div class="rank-level">Nível ${player.level}</div>
            </div>
            <div class="rank-xp">${Utils.formatNumber(player.xp)} XP</div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  }

  loadGuildInfo() {
    const container = document.getElementById("guild-info-container");
    if (!container) return;

    if (!gameEngine.guild.joined) {
      container.innerHTML = `
        <div class="guild-empty">
          <span style="font-size: 4rem;">🛡️</span>
          <h3>Você ainda não está em uma guilda</h3>
          <p>Junte-se a uma guilda para colaborar com outros jogadores e participar de desafios de grupo!</p>
          <a href="guild.html" class="btn-primary">Procurar Guildas</a>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="guild-card">
        <div class="guild-header">
          <div class="guild-emblem">🛡️</div>
          <div>
            <h3>${gameEngine.guild.name}</h3>
            <p>Nível ${gameEngine.guild.level} • ${gameEngine.guild.members} membros</p>
          </div>
        </div>
        <div class="guild-stats">
          <div class="guild-stat">
            <span class="material-icons-round">emoji_events</span>
            <span>15 Vitórias</span>
          </div>
          <div class="guild-stat">
            <span class="material-icons-round">trending_up</span>
            <span>Top 10</span>
          </div>
        </div>
        <a href="guild.html" class="btn-secondary">Ver Guilda</a>
      </div>
    `;
  }

  loadCharacterStats() {
    const container = document.getElementById("character-stats-container");
    if (!container) return;

    const stats = gameEngine.player.stats;

    container.innerHTML = `
      ${Object.entries(stats)
        .map(([stat, value]) => {
          const icons = {
            strength: { icon: "💪", label: "Força" },
            intelligence: { icon: "🧠", label: "Inteligência" },
            charisma: { icon: "✨", label: "Carisma" },
            vitality: { icon: "❤️", label: "Vitalidade" },
            luck: { icon: "🍀", label: "Sorte" },
          };

          const info = icons[stat] || { icon: "📊", label: stat };

          return `
          <div class="stat-card">
            <div class="stat-icon">${info.icon}</div>
            <div class="stat-info">
              <div class="stat-label">${info.label}</div>
              <div class="stat-value">${value}</div>
            </div>
            <div class="stat-bar">
              <div class="stat-bar-fill" style="width: ${(value / 100) * 100}%"></div>
            </div>
          </div>
        `;
        })
        .join("")}
    `;
  }

  loadAchievements() {
    const container = document.getElementById("achievements-container");
    if (!container) return;

    const recentAchievements = gameEngine.achievements
      .filter((a) => a.unlocked)
      .slice(-6); // Show last 6 unlocked

    if (recentAchievements.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span style="font-size: 4rem;">🏆</span>
          <h3>Nenhuma conquista ainda</h3>
          <p>Complete missões e alcance objetivos para desbloquear conquistas!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = recentAchievements
      .map(
        (achievement) => `
      <div class="achievement-card unlocked">
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
          <h4>${achievement.name}</h4>
          <p>${achievement.description}</p>
          ${achievement.unlockedAt ? `<small>Desbloqueada em ${Utils.formatDateShort(achievement.unlockedAt)}</small>` : ""}
        </div>
      </div>
    `,
      )
      .join("");
  }

  loadStatistics() {
    const container = document.getElementById("statistics-container");
    if (!container) return;

    const stats = gameEngine.getPlayerStatsSummary();
    const completedCount = gameEngine.getCompletedQuests().length;
    const activeCount = gameEngine.getActiveQuests().length;

    container.innerHTML = `
      <div class="stat-box">
        <div class="stat-box-icon" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
          <span class="material-icons-round">check_circle</span>
        </div>
        <div class="stat-box-content">
          <h4>${completedCount}</h4>
          <p>Missões Completas</p>
        </div>
      </div>
      
      <div class="stat-box">
        <div class="stat-box-icon" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);">
          <span class="material-icons-round">pending_actions</span>
        </div>
        <div class="stat-box-content">
          <h4>${activeCount}</h4>
          <p>Missões Ativas</p>
        </div>
      </div>
      
      <div class="stat-box">
        <div class="stat-box-icon" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
          <span class="material-icons-round">bolt</span>
        </div>
        <div class="stat-box-content">
          <h4>${Utils.formatNumber(stats.totalXp)}</h4>
          <p>XP Total</p>
        </div>
      </div>
      
      <div class="stat-box">
        <div class="stat-box-icon" style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);">
          <span class="material-icons-round">local_fire_department</span>
        </div>
        <div class="stat-box-content">
          <h4>${stats.streak}</h4>
          <p>Dias de Sequência</p>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // Notification button
    const notifBtn = document.getElementById("notification-btn");
    if (notifBtn) {
      notifBtn.addEventListener("click", () => {
        Notifications.info("Você não tem novas notificações", "Notificações");
      });
    }

    // Logout button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.handleLogout();
      });
    }
  }

  handleLogout() {
    if (confirm("Tem certeza que deseja sair?")) {
      Notifications.info("Até breve!", "Logout");
      // Clear sensitive data but keep game progress
      // In a real app, this would redirect to login
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    }
  }

  showWelcome() {
    const isFirstVisit = !Storage.get("hasVisited");

    if (isFirstVisit) {
      Storage.set("hasVisited", true);
      setTimeout(() => {
        Notifications.show({
          title: "🎮 Bem-vindo ao GameLife!",
          message: "Transforme sua vida em um jogo e alcance seus objetivos!",
          type: "success",
          duration: 6000,
        });
      }, 1000);
    }
  }
}

// Initialize dashboard
const dashboard = new Dashboard();

document.addEventListener("DOMContentLoaded", () => {
  dashboard.init();
});
