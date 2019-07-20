import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import { createProvider } from "./vue-apollo";
import "./assets/tailwind.css";
import FontAwesomeIcon from "./plugins/FontAwesomeIcon";
import moment from "moment";
import Vue2Filters from "vue2-filters";

// GLOBAL FILTERS
Vue.use(Vue2Filters);
Vue.filter("formatDate", function(value, format = "DD.MMM.YY") {
  if (value) {
    return moment(new Date(String(value))).format(format);
  }
});
Vue.filter("year", function(value) {
  if (value) {
    return moment(new Date(String(value))).format("YYYY");
  }
});
Vue.filter("formatUrl", function(value) {
  if (value) {
    return value.replace(/^(https?:\/\/)?(www\.)?/, "").replace(/\/$/, "");
  }
});

//GLOBAL COMPONENTS
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("breadcrumbs", () => import("./components/Breadcrumbs"));

Vue.component("star", () => import("./components/Star"));
Vue.component("plus-sign", () => import("./components/PlusSign"));
Vue.component("back-arrow", () => import("./components/BackArrow"));

Vue.config.productionTip = false;

new Vue({
  router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
