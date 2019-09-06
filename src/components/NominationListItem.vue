<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";

import MovieListItem from "./MovieListItem";
import NominatedPerson from "./NominatedPerson";
import CategoryListItem from "./CategoryListItem";
export default {
  fragments: {
    moviesNomination: gql`
      fragment moviesNomination on MoviesNomination {
        id
        movie {
          ...movie
        }
        moviesNominatedPeople {
          totalCount
          nodes {
            ...moviesNominatedPerson
          }
        }
        category {
          ...moviesCategory
        }
        isWinner
      }
      ${MovieListItem.fragments.movie}
      ${NominatedPerson.fragments.moviesNominatedPerson}
      ${CategoryListItem.fragments.moviesCategory}
    `,
    booksNomination: gql`
      fragment booksNomination on BooksNomination {
        id
        isWinner
        book {
          id
          title
        }

        category {
          id
          name
          order
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
