import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/sass/main.scss'
import VueGoogleCharts from 'vue-google-charts'


createApp(App)
    .use(store)
    .use(router)
    .use(VueGoogleCharts)
    .mount("#app");
