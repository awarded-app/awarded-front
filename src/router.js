import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "Home" */ "./views/Home.vue")
    },
    {
      path: "/about",
      name: "about",
      props: true,
      component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/books",
      name: "homeBooks",
      component: () => import(/* webpackChunkName: "homeBooks" */ "./views/HomeBooks.vue")
    },

    {
      path: "/movies",
      name: "homeMovies",
      component: () => import(/* webpackChunkName: "homeMovies" */ "./views/HomeMovies.vue")
    },
    {
      path: "/:awardType/about",
      name: "Award about",
      props: true,
      component: () => import(/* webpackChunkName: "awardAbout" */ "./views/About.vue")
    },
    {
      path: "/:awardType/award/:nameShort",
      name: "award",
      props: true,
      component: () => import(/* webpackChunkName: "award" */ "./views/AwardView.vue")
    },
    {
      path: "/:awardType/award/:nameShort/:editionYear(\\d+)",
      name: "edition",
      props: true,
      component: () => import(/* webpackChunkName: "edition" */ "./views/EditionView.vue")
    },
    {
      path: "/:awardType/award/:nameShort/category/:categoryName",
      name: "category",
      props: true,
      component: () => import(/* webpackChunkName: "category" */ "./views/CategoryView.vue")
    },
    {
      path: "/:awardType/award/:nameShort/category/:categoryName/prize/:prizeName",
      name: "prize",
      props: true,
      component: () => import(/* webpackChunkName: "prize" */ "./views/PrizeView.vue")
    },

    {
      path: "/:awardType/person/:personId/:personName",
      name: "Person",
      props: true,
      component: () => import(/* webpackChunkName: "Person" */ "./views/PersonView.vue")
    },
    {
      path: "/:awardType/movie/:movieId/:title",
      name: "Movie",
      props: true,
      component: () => import(/* webpackChunkName: "Movie" */ "./views/MovieView.vue")
    },
    {
      path: "/books/:bookTitle/:bookId",
      name: "bookView",
      props: route => ({ awardType: "books", ...route.params }),
      component: () => import(/* webpackChunkName: "bookView" */ "./views/BookView.vue")
    }
  ]
});
