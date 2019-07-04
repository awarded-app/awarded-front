<template>
  <spinner v-if="$apollo.loading" />
  <div v-else-if="nominations" class="pl-6 lg:pl-8 mb-8 mt-4">
    <nomination-list-festival
      v-if="edition.award.isFestival"
      :nominations="nominations.nodes"
    />
    <nomination-list-award v-else :nominations="nominations.nodes" />
  </div>
  <div v-else>Error...</div>
</template>

<script>
import gql from "graphql-tag";

import NominationListFestival from "./NominationListFestival";
import NominationListAward from "./NominationListAward";
import AwardEditionNomination from "./AwardEditionNomination";
export default {
  name: "NominationList",
  components: {
    NominationListAward,
    NominationListFestival
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
        ${AwardEditionNomination.fragments.nomination}
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
