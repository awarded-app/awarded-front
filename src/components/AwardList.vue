<template>
  <spinner v-if="$apollo.loading" />
  <ul v-else-if="awards" class="pl-6 lg:pl-8">
    <award-list-item
      v-for="award in awards.nodes"
      :key="award.id"
      :award="award"
    />
  </ul>

  <p v-else>
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "./AwardListItem";

export default {
  name: "AwardList",
  components: { AwardListItem, Spinner },
  data() {
    return {
      awards: null
    };
  },
  apollo: {
    awards: {
      query: gql`
        query awards {
          awards(condition: { publish: true }) {
            totalCount
            nodes {
              ...award
            }
          }
        }
        ${AwardListItem.fragments.award}
      `
    }
  }
};
</script>

<style lang="scss" scoped></style>
