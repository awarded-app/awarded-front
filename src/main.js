import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import { createProvider } from "./vue-apollo";
import "./assets/tailwind.css";
import FontAwesomeIcon from "./plugins/FontAwesomeIcon";
import { format, differenceInCalendarYears, startOfToday, getYear} from 'date-fns'
import Vue2Filters from "vue2-filters";
import VueMeta from "vue-meta";

Vue.use(VueMeta);
// GLOBAL FILTERS
Vue.use(Vue2Filters);
Vue.filter("formatDate", function(value, dateFormat = "DD.MMM.YY") {
  if (value) {
    return format(new Date(String(value)), dateFormat);
  }
});
Vue.filter("age", function(value) {
  if (value) {
    return differenceInCalendarYears(new Date(String(value)), startOfToday());
  }
});
Vue.filter("year", function(value) {
  if (value) {
    return getYear(new Date(String(value)));
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
