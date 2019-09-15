<template>
  <nav
    class="mb-4 flex flex-col flex-shrink-0 sm:justify-between sm:items-center sm:flex-row sm:flex-row-reverse"
    :class="$route.name.includes('home') ? 'indented' : ''"
  >
    <ul class="text-faded a-uppercase-info flex">
      <!-- <li class="mr-4">Articles</li> -->
      <li v-for="(type, index) in otherTypes" :key="index" class="mr-4 mb-2">
        <a :href="`/${type}`" class="title-link font-bold">{{ type.toUpperCase() }}</a>
      </li>
      <li class="mr-4 mb-2">
        <router-link :to="awardType ? `/${awardType}/about` : '/about'" class="title-link"
          >About</router-link
        >
      </li>
      <li>
        <a
          href="http://eepurl.com/dnFggL"
          target="_blank"
          rel="noopener"
          class="link-external title-link"
          >Subscribe</a
        >
      </li>
    </ul>
    <router-link :to="`/${awardType}`">
      <h1 class="font-bold text-4xl flex flex-col md:flex-row leading-tight mb-2">
        <span class="mr-2 -mb-2 md:mb-0">AWARDED</span>
        <span class="text-faded uppercase">{{ awardType.toUpperCase() }}</span>
      </h1>
    </router-link>
  </nav>
</template>

<script>
export default {
  name: "BaseNav",
  props: {
    awardType: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      awardTypes: ["movies", "books"]
    };
  },
  computed: {
    otherTypes() {
      return this.awardTypes.filter(type => type !== this.awardType);
    }
  }
};
</script>

<style lang="scss" scoped></style>
