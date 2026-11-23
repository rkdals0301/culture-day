import { createApp } from 'vue';
import App from '@/App.vue';
import store from '@/store';

import '@/assets/styles/reset.scss';
import '@/assets/styles/font.scss';
import '@/assets/styles/global.scss';

const app = createApp(App);
app.config.errorHandler = error => {
  console.error('errorHandler', error);
};
app.use(store).mount('#app');
