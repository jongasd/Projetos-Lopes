// Utility Functions
class Utils {
  // Generate unique ID
  static generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Format date
  static formatDate(date) {
    const d = new Date(date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return d.toLocaleDateString("pt-BR", options);
  }

  // Format date short
  static formatDateShort(date) {
    const d = new Date(date);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  // Format time
  static formatTime(date) {
    const d = new Date(date);
    return d.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Days between dates
  static daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    d1.setHours(0, 0, 0, 0);
    d2.setHours(0, 0, 0, 0);

    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // Add days to date
  static addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // Check if date is today
  static isToday(date) {
    const d = new Date(date);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }

  // Check if date is past
  static isPast(date) {
    const d = new Date(date);
    const now = new Date();
    return d < now;
  }

  // Format number with commas
  static formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Truncate text
  static truncate(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + "...";
  }

  // Get difficulty color
  static getDifficultyColor(difficulty) {
    const colors = {
      easy: "#4ade80",
      medium: "#facc15",
      hard: "#f87171",
      extreme: "#c026d3",
    };
    return colors[difficulty] || "#6b7280";
  }

  // Get difficulty label
  static getDifficultyLabel(difficulty) {
    const labels = {
      easy: "Fácil",
      medium: "Médio",
      hard: "Difícil",
      extreme: "Extremo",
    };
    return labels[difficulty] || "Desconhecido";
  }

  // Get category icon
  static getCategoryIcon(category) {
    const icons = {
      tutorial: "🎓",
      education: "📚",
      health: "💪",
      work: "💼",
      personal: "🎯",
      social: "👥",
      hobby: "🎨",
      finance: "💰",
      home: "🏠",
      other: "📌",
    };
    return icons[category] || "📌";
  }

  // Get category label
  static getCategoryLabel(category) {
    const labels = {
      tutorial: "Tutorial",
      education: "Educação",
      health: "Saúde",
      work: "Trabalho",
      personal: "Pessoal",
      social: "Social",
      hobby: "Hobby",
      finance: "Finanças",
      home: "Casa",
      other: "Outro",
    };
    return labels[category] || "Outro";
  }

  // Shuffle array
  static shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // Debounce function
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Escape HTML
  static escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Calculate XP for level
  static xpForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
  }

  // Get level from XP
  static getLevelFromXp(totalXp) {
    let level = 1;
    let xpNeeded = 0;

    while (totalXp >= xpNeeded) {
      xpNeeded += this.xpForLevel(level);
      if (totalXp >= xpNeeded) level++;
    }

    return level;
  }

  // Generate random color
  static randomColor() {
    const colors = [
      "#ef4444",
      "#f97316",
      "#f59e0b",
      "#84cc16",
      "#22c55e",
      "#14b8a6",
      "#06b6d4",
      "#3b82f6",
      "#6366f1",
      "#8b5cf6",
      "#a855f7",
      "#ec4899",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Validate email
  static isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Copy to clipboard
  static async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Failed to copy:", err);
      return false;
    }
  }

  // Download as JSON
  static downloadJSON(data, filename) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Parse JSON safely
  static parseJSON(json, fallback = null) {
    try {
      return JSON.parse(json);
    } catch (e) {
      return fallback;
    }
  }

  // Generate random name
  static generateRandomName() {
    const adjectives = [
      "Valente",
      "Sábio",
      "Rápido",
      "Forte",
      "Astuto",
      "Nobre",
      "Corajoso",
      "Lendário",
    ];
    const nouns = [
      "Guerreiro",
      "Mago",
      "Arqueiro",
      "Cavaleiro",
      "Druida",
      "Paladino",
      "Monge",
      "Bárbaro",
    ];

    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${adj} ${noun}`;
  }

  // Time ago format
  static timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " anos atrás";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " meses atrás";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " dias atrás";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " horas atrás";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutos atrás";

    return "agora mesmo";
  }

  // Smooth scroll to element
  static scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  // Check if element is in viewport
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
