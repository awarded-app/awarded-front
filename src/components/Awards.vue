<template>
  <apollo-query
    :query="
      gql => gql`
        {
          awards {
            totalCount
            nodes {
              ...award
            }
          }
        }
        ${$options.fragments.award}
      `
    "
  >
    <template v-slot="{ result: { data, error }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data">
        <award
          v-for="award in data.awards.nodes"
          :key="award.id"
          :award="award"
        />
      </div>
      <div v-else>Error...</div>
    </template>
  </apollo-query>
</template>

<script>
import gql from "graphql-tag";
import Award from "./Award";
export default {
  name: "Awards",
  components: { Award },
  fragments: {
    award: gql`
      fragment award on Award {
        id
        nameShort
        nameLong
        logo
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
