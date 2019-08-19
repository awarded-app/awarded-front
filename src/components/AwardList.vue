<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <ul v-else-if="awards">
    <award-list-item v-for="award in awards.nodes" :key="award.id" s :award="award" />
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
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      awards: null
    };
  },
  apollo: {
    awards: {
      query: gql`
        query awards($condition: AwardCondition) {
          awards(condition: $condition, orderBy: NAME_SHORT_ASC) {
            totalCount
            nodes {
              ...award
            }
          }
        }
        ${AwardListItem.fragments.award}
      `,
      variables() {
        return {
          condition: {
            publish: true,
            type: this.type
          }
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
