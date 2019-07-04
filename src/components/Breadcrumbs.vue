<template>
  <nav class="flex items-center text-gray-500 text-sm my-8">
    <slot />
  </nav>
</template>

<script>
export default {
  name: "Breadcrumbs"
};
</script>

<style scoped>
ul {
  @apply flex items-center;
}

ul li:after {
  content: "★";
  @apply mx-2 text-xs text-gray-800;
}
ul li:last-child:after {
  content: none;
}
</style>
