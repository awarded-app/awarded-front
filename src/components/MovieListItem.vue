<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
export default {
  fragments: {
    movie: gql`
      fragment movie on Movie {
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
        movieCountries {
          totalCount
          nodes {
            country {
              id
              name
              code
            }
          }
        }
        posterPath
        moviePosters {
          totalCount
          nodes {
            id
            filename
          }
        }
        movieBackdrops {
          nodes {
            id
            filename
          }
          totalCount
        }
        movieGenres {
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
