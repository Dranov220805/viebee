import { VIEBEE_STORAGE_KEYS } from "../const";

/**
 * Safe LocalStorage and SessionStorage wrappers with fallback for SSR and quota errors.
 */
export const storageHelper = {
  get: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (e) {
      console.warn(`[VieBee Storage] Error reading ${key}:`, e);
      return defaultValue;
    }
  },

  set: <T>(key: string, value: T): boolean => {
    if (typeof window === "undefined") return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`[VieBee Storage] Error writing ${key}:`, e);
      return false;
    }
  },

  remove: (key: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[VieBee Storage] Error removing ${key}:`, e);
    }
  },

  sessionGet: <T>(key: string, defaultValue: T): T => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },

  sessionSet: <T>(key: string, value: T): boolean => {
    if (typeof window === "undefined") return false;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  },
};
