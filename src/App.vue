<template>
  <component :is="layout">
    <page-transition name="fade-in-right">
      <router-view :layout.sync="layout" />
    </page-transition>
  </component>
</template>

<script>
import PageTransition from "@/components/PageTransition";
export default {
  name: "App",
  components: {
    PageTransition
  },
  data() {
    return {
      layout: "div"
    };
  }
};
</script>
