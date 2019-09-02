<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <div v-else-if="nominations" class="mb-8 indented">
    <nomination-list-festival
      v-if="edition.award.isFestival"
      :nominations="nominations.nodes"
      :edition-date="edition.date"
      :award-name-short="edition.award.nameShort"
      :award-type="awardType"
    />
    <nomination-list-award v-else :nominations="nominations.nodes" :award-type="awardType" />
  </div>
  <p v-else class="indented">
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
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      nominations: null,
      AwardType: this.$options.filters.capitalize(this.awardType),
      AWARDTYPE: this.awardType.toUpperCase()
    };
  },
  apollo: {
    nominations: {
      query() {
        const fragment = NominationListItem.fragments[`${this.awardType}Nomination`];
        return gql`
          query ${this.awardType}Nominations($condition: ${this.AwardType}NominationCondition) {
            ${this.awardType}Nominations(condition: $condition, orderBy: CATEGORY_ORDER_DESC) {
              totalCount
              nodes {
                ...${this.awardType}Nomination
              }
            }
          }
          ${fragment}
        `;
      },
      variables() {
        return {
          condition: {
            editionId: this.edition.id
          }
        };
      },
      update(data) {
        return (this.nominations = data[`${this.awardType}Nominations`]);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
