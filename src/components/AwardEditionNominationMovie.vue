<template functional>
  <span class="text-gray-500">{{ props.nomination.category.name }}</span>
</template>
<script>
import gql from "graphql-tag";

export default {
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
