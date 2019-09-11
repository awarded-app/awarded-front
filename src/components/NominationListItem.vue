<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";

import MovieListItem from "./MovieListItem";
import MoviesNominatedPerson from "./MoviesNominatedPerson";
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
      ${MoviesNominatedPerson.fragments.moviesNominatedPerson}
      ${CategoryListItem.fragments.moviesCategory}
    `,
    booksNomination: gql`
      fragment booksNomination on BooksNomination {
        id
        isWinner
        isShortlisted
        book {
          id
          title
          imageUrl
          isbn10
          isbn13
          booksBookAuthors {
            totalCount
            nodes {
              id
              author {
                id
                name
              }
            }
          }
        }
        booksNominationPrizes {
          totalCount
          nodes {
            id
            prize {
              id
              name
            }
          }
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
