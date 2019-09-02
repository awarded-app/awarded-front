<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
export default {
  fragments: {
    moviesCategory: gql`
      fragment moviesCategory on MoviesCategory {
        id
        important
        name
        description
        display
        order
        moviesPrizes {
          nodes {
            id
            name
            order
            display
          }
        }
        award {
          id
          nameShort
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
