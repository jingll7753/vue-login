import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Carousel3d from 'vue-carousel-3d';

const app = createApp(App);
for (const name in ElementPlusIconsVue) {
    app.component(name, ElementPlusIconsVue[name])
}
app.use(ElementPlus).use(VueAxios, axios).use(Carousel3d);
app.mount("#app");