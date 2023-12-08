import { createApp } from "vue"
import App from "./App.vue"
import Mitt from "mitt"
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import "ol/ol.css"
import "./styles/index.scss"



const app = createApp(App);

app.config.globalProperties.$bus = new Mitt();

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
