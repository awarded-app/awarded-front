<template functional>
  <div>
    <h3>
      <span class="text-gray-500">{{ props.nomination.category.name }}</span>
    </h3>
  </div>
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
      }
    `
  }
};
</script>
