import App from './App.vue';
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';
import router from './router';
import { createApp } from 'vue';

import '../src/assets/styles.scss';
import '../src/assets/tailwind.css';

const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: '.app-dark'
        }
    }
});
app.mount('#app');
