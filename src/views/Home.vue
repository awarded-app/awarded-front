<template>
  <layout name="HomeLayout">
    <div class="mx-auto">
      <div class="home-cta-cards mb-24">
        <home-cta award-type="movies" />
        <home-cta award-type="books" />
      </div>
      <news-list />
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import HomeCta from "@/components/HomeCta";
import NewsList from "@/components/NewsList";

export default {
  name: "Home",
  metaInfo: {
    title: `Awarded - Keep track of the most important awards and festivals`,
    titleTemplate: ""
  },
  components: {
    Layout,
    NewsList,
    HomeCta
  }
};
</script>

<style>
.home-cta-cards {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 400px));
  justify-content: center;
}
</style>
