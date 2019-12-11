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
        backdropPath
        posterPath
        moviesMovieAsins {
          nodes {
            countryCode
            asin
            id
          }
          totalCount
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
