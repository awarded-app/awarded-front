<template>
  <div>
    <spinner v-if="$apollo.loading"/>
    <div v-else-if="awards">
      <award v-for="award in awards.nodes" :key="award.id" :award="award"/>
    </div>
    <div v-else>Error...</div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "./Spinner";
import Award from "./Award";
export default {
  name: "Awards",
  components: { Award, Spinner },
  data() {
    return {
      awards: null
    };
  },
  apollo: {
    awards: {
      query: gql`
        {
          awards {
            totalCount
            nodes {
              ...award
            }
          }
        }
        ${Award.fragments.award}
      `
    }
  }
};
</script>

<style lang="scss" scoped></style>
