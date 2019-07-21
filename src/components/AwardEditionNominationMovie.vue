<template>
  <span class="text-gray-500">
    <category-link
      :category-name="nomination.category.name"
      :award-name-short="nomination.category.award.nameShort"
    >
      {{ nomination.category.name }}
    </category-link>
  </span>
</template>
<script>
import gql from "graphql-tag";
import CategoryLink from "./CategoryLink";
export default {
  components: {
    CategoryLink
  },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  },
  fragments: {
    movie: gql`
      fragment movie on Movie {
        id
        title
        posterPath
        tmdbId
      }
    `
  }
};
</script>
