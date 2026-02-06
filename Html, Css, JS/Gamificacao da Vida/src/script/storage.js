// Storage Manager - LocalStorage wrapper with encryption support
class Storage {
  static prefix = "gamelife_";

  // Set item in storage
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (error) {
      console.error("Storage set error:", error);
      return false;
    }
  }

  // Get item from storage
  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error("Storage get error:", error);
      return defaultValue;
    }
  }

  // Remove item from storage
  static remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (error) {
      console.error("Storage remove error:", error);
      return false;
    }
  }

  // Clear all storage
  static clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error("Storage clear error:", error);
      return false;
    }
  }

  // Check if key exists
  static has(key) {
    return localStorage.getItem(this.prefix + key) !== null;
  }

  // Get all keys
  static keys() {
    const keys = Object.keys(localStorage);
    return keys
      .filter((key) => key.startsWith(this.prefix))
      .map((key) => key.substring(this.prefix.length));
  }

  // Get storage size
  static getSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(this.prefix)) {
        total += localStorage[key].length + key.length;
      }
    }
    return (total / 1024).toFixed(2); // Size in KB
  }

  // Export all data
  static exportData() {
    const data = {};
    this.keys().forEach((key) => {
      data[key] = this.get(key);
    });
    return data;
  }

  // Import data
  static importData(data) {
    try {
      Object.keys(data).forEach((key) => {
        this.set(key, data[key]);
      });
      return true;
    } catch (error) {
      console.error("Storage import error:", error);
      return false;
    }
  }

  // Backup data
  static backup() {
    const data = this.exportData();
    const timestamp = new Date().toISOString();
    const backup = {
      timestamp,
      version: "1.0",
      data,
    };
    return backup;
  }

  // Restore from backup
  static restore(backup) {
    try {
      if (backup && backup.data) {
        this.importData(backup.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Storage restore error:", error);
      return false;
    }
  }
}
