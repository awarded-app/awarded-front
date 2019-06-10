import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import { createProvider } from "./vue-apollo";
import "./assets/tailwind.css";
import FontAwesomeIcon from "./plugins/FontAwesomeIcon";

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
