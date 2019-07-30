<template>
  <nav class="flex items-center flex-wrap text-gray-500 text-sm mb-2 indented">
    <ul class="flex flex-wrap">
      <li>
        <router-link to="/" tag="a" class="title-link">Awards</router-link>
      </li>
      <template v-if="prevScreenParams">
        <li v-if="prevScreenParams.hasOwnProperty('nameShort')">
          <router-link :to="`/award/${prevScreenParams.nameShort}`" tag="a" class="title-link">
            {{ prevScreenParams.nameShort }}</router-link
          >
        </li>
        <li v-if="prevScreenParams.hasOwnProperty('editionYear')">
          <router-link
            :to="`/award/${prevScreenParams.nameShort}/${prevScreenParams.editionYear}`"
            tag="a"
            class="title-link"
          >
            {{ prevScreenParams.editionYear }}</router-link
          >
        </li>
      </template>
      <li>
        <slot />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Breadcrumbs",
  props: {
    prevScreenParams: {
      type: Object,
      default: null
    }
  }
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
