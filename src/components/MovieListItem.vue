<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
export default {
  fragments: {
    movie: gql`
      fragment movie on MoviesMovie {
        id
        title
        homepage
        imdbId
        originalLanguage
        originalTitle
        overview
        releaseDate
        runtime
        tagline
        tmdbId
        asin {
          us
          de
        }
        moviesMovieCountries {
          totalCount
          nodes {
            country {
              id
              name
              code
            }
          }
        }
        backdropPath
        moviesMovieGenres {
          nodes {
            id
            genre {
              id
              name
              tmdbId
            }
          }
          totalCount
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
