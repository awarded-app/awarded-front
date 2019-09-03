<template>
  <nav
    class="flex items-center flex-wrap text-gray-500 text-sm mb-2"
    :class="$route.name === 'homeMovies' ? 'indented' : ''"
  >
    <ul class="flex flex-wrap">
      <li>
        <router-link to="/movies" tag="a" class="title-link">Awards</router-link>
      </li>
      <template v-if="prevScreenParams">
        <li v-if="prevScreenParams.hasOwnProperty('nameShort')">
          <award-link :award-name-short="prevScreenParams.nameShort" :award-type="awardType">{{
            prevScreenParams.nameShort
          }}</award-link>
        </li>
        <li v-if="prevScreenParams.hasOwnProperty('editionYear')">
          <edition-link
            :award-name-short="prevScreenParams.nameShort"
            :edition-date="prevScreenParams.editionYear"
            :edition-year="prevScreenParams.editionYear"
            >{{ prevScreenParams.editionYear }}</edition-link
          >
        </li>
        <li v-if="prevScreenParams.hasOwnProperty('categoryName')">
          <category-link
            :category-name="prevScreenParams.categoryName"
            :award-name-short="prevScreenParams.nameShort"
            >{{ prevScreenParams.categoryName }}</category-link
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
import CategoryLink from "@/components/CategoryLink";
import AwardLink from "@/components/AwardLink";
import EditionLink from "@/components/EditionLink";
export default {
  name: "Breadcrumbs",
  components: {
    AwardLink,
    CategoryLink,
    EditionLink
  },
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
