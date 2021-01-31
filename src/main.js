import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/sass/main.scss";
import VueGoogleCharts from "vue-google-charts";
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';


createApp(App)
    .use(store)
    .use(router)
    .use(VueGoogleCharts)
    .use(ElementPlus)
    .mount("#app");
