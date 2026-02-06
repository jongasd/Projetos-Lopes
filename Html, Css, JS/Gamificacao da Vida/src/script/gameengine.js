// Game Engine - Core game logic and state management
class GameEngine {
  constructor() {
    this.player = null;
    this.quests = [];
    this.achievements = [];
    this.guild = null;
    this.friends = [];
    this.initialized = false;
  }

  // Initialize game engine
  async init() {
    if (this.initialized) return;

    await this.loadPlayerData();
    await this.loadQuests();
    await this.loadAchievements();
    await this.loadGuildData();
    await this.checkDailyQuest();

    this.initialized = true;
    this.startBackgroundTasks();
  }

  // Load player data from storage
  async loadPlayerData() {
    const savedPlayer = Storage.get("player");

    if (savedPlayer) {
      this.player = savedPlayer;
    } else {
      // Create new player
      this.player = {
        id: Utils.generateId(),
        name: "Herói",
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        coins: 0,
        streak: 0,
        lastLogin: new Date().toISOString(),
        stats: {
          strength: 1,
          intelligence: 1,
          charisma: 1,
          vitality: 1,
          luck: 1,
        },
        inventory: [],
        completedQuests: 0,
        totalXpEarned: 0,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hero",
      };
      this.savePlayer();
    }

    this.updateStreak();
  }

  // Save player data
  savePlayer() {
    Storage.set("player", this.player);
  }

  // Load quests
  async loadQuests() {
    const savedQuests = Storage.get("quests") || [];

    if (savedQuests.length === 0) {
      // Create sample quests
      this.quests = [
        {
          id: Utils.generateId(),
          title: "Primeira Missão",
          description: "Complete sua primeira tarefa!",
          category: "tutorial",
          difficulty: "easy",
          xpReward: 50,
          coinsReward: 10,
          status: "active",
          createdAt: new Date().toISOString(),
          dueDate: null,
        },
        {
          id: Utils.generateId(),
          title: "Estudar por 1 hora",
          description: "Dedique 1 hora aos estudos",
          category: "education",
          difficulty: "medium",
          xpReward: 100,
          coinsReward: 25,
          status: "active",
          createdAt: new Date().toISOString(),
          dueDate: Utils.addDays(new Date(), 1).toISOString(),
        },
        {
          id: Utils.generateId(),
          title: "Exercício Físico",
          description: "Faça 30 minutos de exercício",
          category: "health",
          difficulty: "medium",
          xpReward: 80,
          coinsReward: 20,
          status: "active",
          createdAt: new Date().toISOString(),
          dueDate: null,
        },
      ];
      this.saveQuests();
    } else {
      this.quests = savedQuests;
    }
  }

  // Save quests
  saveQuests() {
    Storage.set("quests", this.quests);
  }

  // Complete a quest
  completeQuest(questId) {
    const quest = this.quests.find((q) => q.id === questId);

    if (!quest || quest.status === "completed") return;

    quest.status = "completed";
    quest.completedAt = new Date().toISOString();

    // Award XP and coins
    this.addXp(quest.xpReward);
    this.addCoins(quest.coinsReward);

    this.player.completedQuests++;

    this.saveQuests();
    this.savePlayer();

    // Show notification
    Notifications.show({
      title: "🎉 Missão Completa!",
      message: `Você completou: ${quest.title}`,
      type: "success",
      duration: 5000,
    });

    // Check for achievements
    this.checkAchievements();

    return quest;
  }

  // Add XP to player
  addXp(amount) {
    this.player.xp += amount;
    this.player.totalXpEarned += amount;

    // Check for level up
    while (this.player.xp >= this.player.xpToNextLevel) {
      this.levelUp();
    }

    this.savePlayer();
  }

  // Level up player
  levelUp() {
    this.player.xp -= this.player.xpToNextLevel;
    this.player.level++;
    this.player.xpToNextLevel = Math.floor(this.player.xpToNextLevel * 1.5);

    // Award bonus coins
    const bonusCoins = this.player.level * 10;
    this.addCoins(bonusCoins);

    // Show level up notification
    Notifications.show({
      title: "⭐ LEVEL UP!",
      message: `Parabéns! Você alcançou o nível ${this.player.level}!`,
      type: "levelup",
      duration: 7000,
    });

    // Trigger level up animation
    Animations.levelUp();

    this.savePlayer();
  }

  // Add coins
  addCoins(amount) {
    this.player.coins += amount;
    this.savePlayer();
  }

  // Update streak
  updateStreak() {
    const lastLogin = new Date(this.player.lastLogin);
    const today = new Date();
    const diffDays = Utils.daysBetween(lastLogin, today);

    if (diffDays === 1) {
      // Continue streak
      this.player.streak++;
    } else if (diffDays > 1) {
      // Streak broken
      this.player.streak = 1;
    }
    // If same day, do nothing

    this.player.lastLogin = today.toISOString();
    this.savePlayer();
  }

  // Load achievements
  async loadAchievements() {
    this.achievements = [
      {
        id: "first_quest",
        name: "Primeiro Passo",
        description: "Complete sua primeira missão",
        unlocked: false,
        icon: "🎯",
      },
      {
        id: "level_5",
        name: "Iniciante",
        description: "Alcance o nível 5",
        unlocked: false,
        icon: "⭐",
      },
      {
        id: "level_10",
        name: "Aventureiro",
        description: "Alcance o nível 10",
        unlocked: false,
        icon: "🌟",
      },
      {
        id: "streak_7",
        name: "Dedicado",
        description: "Mantenha 7 dias de sequência",
        unlocked: false,
        icon: "🔥",
      },
      {
        id: "quests_10",
        name: "Trabalhador",
        description: "Complete 10 missões",
        unlocked: false,
        icon: "💪",
      },
      {
        id: "quests_50",
        name: "Veterano",
        description: "Complete 50 missões",
        unlocked: false,
        icon: "🏆",
      },
      {
        id: "rich",
        name: "Rico",
        description: "Acumule 1000 moedas",
        unlocked: false,
        icon: "💰",
      },
    ];

    const saved = Storage.get("achievements");
    if (saved) {
      this.achievements = this.achievements.map((ach) => {
        const savedAch = saved.find((s) => s.id === ach.id);
        return savedAch || ach;
      });
    }
  }

  // Check and unlock achievements
  checkAchievements() {
    let newAchievements = [];

    this.achievements.forEach((achievement) => {
      if (achievement.unlocked) return;

      let shouldUnlock = false;

      switch (achievement.id) {
        case "first_quest":
          shouldUnlock = this.player.completedQuests >= 1;
          break;
        case "level_5":
          shouldUnlock = this.player.level >= 5;
          break;
        case "level_10":
          shouldUnlock = this.player.level >= 10;
          break;
        case "streak_7":
          shouldUnlock = this.player.streak >= 7;
          break;
        case "quests_10":
          shouldUnlock = this.player.completedQuests >= 10;
          break;
        case "quests_50":
          shouldUnlock = this.player.completedQuests >= 50;
          break;
        case "rich":
          shouldUnlock = this.player.coins >= 1000;
          break;
      }

      if (shouldUnlock) {
        achievement.unlocked = true;
        achievement.unlockedAt = new Date().toISOString();
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      Storage.set("achievements", this.achievements);

      // Show achievement notifications
      newAchievements.forEach((ach) => {
        Notifications.show({
          title: `${ach.icon} Conquista Desbloqueada!`,
          message: ach.name,
          type: "achievement",
          duration: 6000,
        });
      });
    }
  }

  // Load guild data
  async loadGuildData() {
    const savedGuild = Storage.get("guild");

    if (savedGuild) {
      this.guild = savedGuild;
    } else {
      this.guild = {
        id: null,
        name: null,
        level: 0,
        members: 0,
        joined: false,
      };
    }
  }

  // Check daily quest
  async checkDailyQuest() {
    const dailyQuest = Storage.get("dailyQuest");
    const lastDaily = Storage.get("lastDailyReset");
    const today = new Date().toDateString();

    if (!dailyQuest || lastDaily !== today) {
      // Generate new daily quest
      const newDailyQuest = this.generateDailyQuest();
      Storage.set("dailyQuest", newDailyQuest);
      Storage.set("lastDailyReset", today);
    }
  }

  // Generate daily quest
  generateDailyQuest() {
    const dailyQuests = [
      {
        title: "Rotina Matinal",
        description: "Complete sua rotina matinal",
        xp: 150,
        coins: 30,
        icon: "🌅",
      },
      {
        title: "Leitura",
        description: "Leia por 30 minutos",
        xp: 120,
        coins: 25,
        icon: "📚",
      },
      {
        title: "Hidratação",
        description: "Beba 2 litros de água",
        xp: 100,
        coins: 20,
        icon: "💧",
      },
      {
        title: "Meditação",
        description: "Medite por 10 minutos",
        xp: 110,
        coins: 22,
        icon: "🧘",
      },
      {
        title: "Organização",
        description: "Organize seu espaço de trabalho",
        xp: 90,
        coins: 18,
        icon: "🗂️",
      },
    ];

    const random = dailyQuests[Math.floor(Math.random() * dailyQuests.length)];

    return {
      ...random,
      id: Utils.generateId(),
      completed: false,
      date: new Date().toDateString(),
    };
  }

  // Start background tasks
  startBackgroundTasks() {
    // Update daily timer every second
    setInterval(() => {
      this.updateDailyTimer();
    }, 1000);
  }

  // Update daily timer
  updateDailyTimer() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const diff = tomorrow - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const timerElement = document.getElementById("daily-timer");
    if (timerElement) {
      timerElement.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    // Check if new day
    if (hours === 23 && minutes === 59 && seconds === 59) {
      setTimeout(() => {
        this.checkDailyQuest();
        window.location.reload();
      }, 1000);
    }
  }

  // Get active quests
  getActiveQuests(limit = null) {
    const active = this.quests.filter((q) => q.status === "active");
    return limit ? active.slice(0, limit) : active;
  }

  // Get completed quests
  getCompletedQuests() {
    return this.quests.filter((q) => q.status === "completed");
  }

  // Get player stats summary
  getPlayerStatsSummary() {
    return {
      level: this.player.level,
      xp: this.player.xp,
      xpToNextLevel: this.player.xpToNextLevel,
      xpPercentage: (this.player.xp / this.player.xpToNextLevel) * 100,
      coins: this.player.coins,
      streak: this.player.streak,
      completedQuests: this.player.completedQuests,
      totalXp: this.player.totalXpEarned,
    };
  }
}

// Initialize global game engine
const gameEngine = new GameEngine();
