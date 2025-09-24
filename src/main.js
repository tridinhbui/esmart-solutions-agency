// src/main.js
import App from "./App.vue";
import router from "./router";
import { createApp } from "vue"; // Importing createApp directly from 'vue'
import vuetify from "./plugins/vuetify";
import "./assets/global.css";
import "./assets/css/elegant-utilities.css";
import i18n from "./i18n";
import { createPinia } from "pinia";
import "@fortawesome/fontawesome-free/css/all.css";

createApp(App)
  .use(router)
  .use(vuetify)
  .use(i18n)
  .use(createPinia())
  .mount("#app");
