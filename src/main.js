// src/main.js
import App from './App.vue';
import router from './router';
import { createApp } from 'vue'; // Importing createApp directly from 'vue'
import vuetify from './plugins/vuetify';
import './assets/global.css';


createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app');
