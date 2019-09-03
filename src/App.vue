<template>
  <component :is="layout">
    <vue-page-transition name="fade-in-right">
      <router-view :layout.sync="layout" />
    </vue-page-transition>
  </component>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      layout: "div"
    };
  }
};
</script>
