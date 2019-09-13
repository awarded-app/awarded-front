<template>
  <layout name="HomeLayout">
    <div class="mx-auto">

    <div class="home-cta-cards">
      <home-cta award-type="movies"/>
      <home-cta award-type="books"/>
    </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import HomeCta from "@/components/HomeCta";

export default {
  name: "Home",
  metaInfo: {
    title: `Awarded - Keep track of the most important awards and festivals`,
    titleTemplate: ""
  },
  components: {
    Layout,
    HomeCta,
  },

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
