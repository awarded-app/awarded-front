import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/movies"
    },
    {
      path: "/about",
      name: "about",
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/movies",
      name: "homeMovies",
      component: () => import(/* webpackChunkName: "homeMovies" */ "./views/HomeMovies.vue")
    },
    {
      path: "/movies/award/:nameShort",
      name: "award",
      props: true,
      component: () => import(/* webpackChunkName: "award" */ "./views/AwardView.vue")
    },
    {
      path: "/movies/award/:nameShort/:editionYear(\\d+)",
      name: "edition",
      props: true,
      component: () => import(/* webpackChunkName: "edition" */ "./views/EditionView.vue")
    },
    {
      path: "/movies/award/:nameShort/category/:categoryName",
      name: "category",
      props: true,
      component: () => import(/* webpackChunkName: "category" */ "./views/CategoryView.vue")
    },
    {
      path: "/movies/award/:nameShort/category/:categoryName/prize/:prizeName",
      name: "prize",
      props: true,
      component: () => import(/* webpackChunkName: "prize" */ "./views/PrizeView.vue")
    },
    {
      path: "/movies/movie/:movieId/:title",
      name: "Movie",
      props: true,
      component: () => import(/* webpackChunkName: "Movie" */ "./views/MovieView.vue")
    },
    {
      path: "/movies/person/:personId/:personName",
      name: "Person",
      props: true,
      component: () => import(/* webpackChunkName: "Person" */ "./views/PersonView.vue")
    }
  ]
});
