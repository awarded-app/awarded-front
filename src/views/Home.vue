<template>
  <layout name="HomeLayout">
    <div class="flex flex-wrap justify-around">
      <home-cta award-type="movies"/>
      <home-cta award-type="books"/>
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


