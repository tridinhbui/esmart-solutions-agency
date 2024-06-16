// src/main.js
import App from './App.vue';
import router from './router';
import { createApp } from 'vue'; // Importing createApp directly from 'vue'

createApp(App)
  .use(router)
  .mount('#app');
