<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <div v-else-if="nominations" class="mb-8 indented">
    <nomination-list-festival v-if="edition.award.isFestival" :nominations="nominations.nodes" />
    <nomination-list-award v-else :nominations="nominations.nodes" />
  </div>
  <p v-else>
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import NominationListFestival from "./NominationListFestival";
import NominationListAward from "./NominationListAward";
import NominationListItem from "./NominationListItem";
export default {
  name: "NominationList",
  components: {
    NominationListAward,
    NominationListFestival,
    Spinner
  },
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nominations: null
    };
  },
  apollo: {
    nominations: {
      query: gql`
        query nominations($condition: NominationCondition) {
          nominations(condition: $condition, orderBy: CATEGORY_ORDER_DESC) {
            totalCount
            nodes {
              ...nomination
            }
          }
        }
        ${NominationListItem.fragments.nomination}
      `,
      variables() {
        return {
          condition: {
            editionId: this.edition.id
          }
        };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
