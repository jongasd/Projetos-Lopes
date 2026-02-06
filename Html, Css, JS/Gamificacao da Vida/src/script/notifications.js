// Notifications System
class Notifications {
  static container = null;
  static queue = [];
  static activeNotifications = [];
  static maxNotifications = 3;

  // Initialize notifications system
  static init() {
    this.container = document.getElementById("notification-container");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "notification-container";
      this.container.className = "notification-container";
      document.body.appendChild(this.container);
    }
  }

  // Show notification
  static show(options) {
    const {
      title = "",
      message = "",
      type = "info", // info, success, error, warning, achievement, levelup
      duration = 4000,
      icon = null,
      onClick = null,
    } = options;

    if (!this.container) this.init();

    const notification = this.createNotification({
      title,
      message,
      type,
      duration,
      icon,
      onClick,
    });

    if (this.activeNotifications.length >= this.maxNotifications) {
      this.queue.push(notification);
    } else {
      this.displayNotification(notification);
    }
  }

  // Create notification element
  static createNotification(options) {
    const { title, message, type, duration, icon, onClick } = options;

    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const iconElement = icon || this.getDefaultIcon(type);

    notification.innerHTML = `
      <div class="notification-icon">${iconElement}</div>
      <div class="notification-content">
        <div class="notification-title">${Utils.escapeHtml(title)}</div>
        ${message ? `<div class="notification-message">${Utils.escapeHtml(message)}</div>` : ""}
      </div>
      <button class="notification-close">
        <span class="material-icons-round">close</span>
      </button>
    `;

    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      this.closeNotification(notification);
    });

    if (onClick) {
      notification.style.cursor = "pointer";
      notification.addEventListener("click", (e) => {
        if (!e.target.closest(".notification-close")) {
          onClick();
          this.closeNotification(notification);
        }
      });
    }

    notification.dataset.duration = duration;

    return notification;
  }

  // Display notification
  static displayNotification(notification) {
    this.container.appendChild(notification);
    this.activeNotifications.push(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add("notification-show");
    }, 10);

    const duration = parseInt(notification.dataset.duration);
    if (duration > 0) {
      setTimeout(() => {
        this.closeNotification(notification);
      }, duration);
    }
  }

  // Close notification
  static closeNotification(notification) {
    if (!notification || !notification.parentElement) return;

    notification.classList.remove("notification-show");
    notification.classList.add("notification-hide");

    setTimeout(() => {
      if (notification.parentElement) {
        this.container.removeChild(notification);
      }

      const index = this.activeNotifications.indexOf(notification);
      if (index > -1) {
        this.activeNotifications.splice(index, 1);
      }

      // Show next queued notification
      if (this.queue.length > 0) {
        const next = this.queue.shift();
        this.displayNotification(next);
      }
    }, 300);
  }

  // Get default icon for type
  static getDefaultIcon(type) {
    const icons = {
      info: '<span class="material-icons-round">info</span>',
      success: '<span class="material-icons-round">check_circle</span>',
      error: '<span class="material-icons-round">error</span>',
      warning: '<span class="material-icons-round">warning</span>',
      achievement: "🏆",
      levelup: "⭐",
    };
    return icons[type] || icons.info;
  }

  // Success notification
  static success(message, title = "Sucesso") {
    this.show({ title, message, type: "success" });
  }

  // Error notification
  static error(message, title = "Erro") {
    this.show({ title, message, type: "error", duration: 6000 });
  }

  // Warning notification
  static warning(message, title = "Atenção") {
    this.show({ title, message, type: "warning" });
  }

  // Info notification
  static info(message, title = "Informação") {
    this.show({ title, message, type: "info" });
  }

  // Clear all notifications
  static clearAll() {
    this.activeNotifications.forEach((notification) => {
      this.closeNotification(notification);
    });
    this.queue = [];
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  Notifications.init();
});
