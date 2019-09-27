import Vue from "vue";
import VueMeta from "vue-meta";
import App from "./App.vue";
import router from "./router";
import { createProvider } from "./vue-apollo";
import "./plugins/Filters";
import "./assets/tailwind.css";

import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

Sentry.init({
  dsn: 'https://0aad01c1342c48ae91cf113839a46fd4@sentry.io/1757469',
  integrations: [new Integrations.Vue({ Vue, attachProps: true })],
});

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
