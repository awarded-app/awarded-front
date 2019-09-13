import Vue from "vue";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";
import "./plugins/Filters";
import "./assets/tailwind.css";

Vue.use(VueMeta);

//GLOBAL COMPONENTS
Vue.component("breadcrumbs", () => import("./components/Breadcrumbs"));
Vue.component("star", () => import("./components/Star"));
Vue.component("plus-sign", () => import("./components/PlusSign"));

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
