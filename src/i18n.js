// src/i18n.js
import { createI18n } from "vue-i18n";

// Import your locale files
import en from "./locales/en.json";
import vi from "./locales/vi.json";

const messages = {
  en: en,
  vi: vi,
};

const i18n = createI18n({
  legacy: false, // enable composition API mode
  locale: "en", // default locale - changed to English
  messages,
  globalInjection: true,
});

export default i18n;
