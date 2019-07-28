<template>
  <spinner v-if="$apollo.loading" class="indented"/>
  <ul v-else-if="awards" class="indented">
    <award-list-item
      v-for="award in awards.nodes"
      :key="award.id"s
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
