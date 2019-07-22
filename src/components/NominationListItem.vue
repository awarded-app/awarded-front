<template>
  <div>

  </div>
</template>

<script>
import gql from "graphql-tag";

import MovieListItem from "./MovieListItem";
import NominatedPerson from "./NominatedPerson";
import CategoryListItem from "./CategoryListItem";
  export default {
    fragments: {
    nomination: gql`
      fragment nomination on Nomination {
        id
        movie {
          ...movie
        }
        nominatedPeople {
          totalCount
          nodes {
            ...nominatedPerson
          }
        }
        category {
          ...category
        }
        winner
      }
      ${MovieListItem.fragments.movie}
      ${NominatedPerson.fragments.nominatedPerson}
      ${CategoryListItem.fragments.category}
    `
  }
  }
</script>

<style lang="scss" scoped>

</style>