import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/award/:nameShort",
      name: "award",
      props: true,
      component: () =>
        import(/* webpackChunkName: "award" */ "./views/Award.vue")
    },
    {
      path: "/award/:nameShort/:editionYear",
      name: "edition",
      props: true,
      component: () =>
        import(/* webpackChunkName: "edition" */ "./views/Edition.vue")
    },
    {
      path: "/movie/:movie_id/:title",
      name: "Movie",
      props: true,
      component: () =>
        import(/* webpackChunkName: "Movie" */ "./views/Movie.vue")
    }
  ]
});
