<template>
  <div class="home">
    <awards />
  </div>
</template>

<script>
// @ is an alias to /src
import Awards from "../components/Awards.vue";

export default {
  name: "home",
  components: {
    Awards
  }
};
</script>
