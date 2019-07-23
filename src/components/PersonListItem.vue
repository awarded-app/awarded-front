<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
export default {
  fragments: {
    person: gql`
      fragment person on Person {
        nodeId
        id
        tmdbId
        imdbId
        name
        gender
        biography
        birthday
        deathday
        alsoKnownAs
        adult
        homepage
        knownForDepartment
        placeOfBirth
        popularity
        profilePath
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
