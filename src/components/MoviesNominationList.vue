<template>
  <spinner v-if="$apollo.loading" class="indented" />
  <div v-else-if="nominations" class="mb-8 indented">
    <movies-nomination-list-festival
      v-if="edition.award.isFestival"
      :nominations="nominations.nodes"
      :edition-official-year="edition.officialYear"
      :award-name-short="edition.award.nameShort"
    />
    <movies-nomination-list-award
      v-else
      :nominations="nominations.nodes"
      :edition-official-year="edition.officialYear"
      :edition-date="edition.date"
      :award-name-short="edition.award.nameShort"
    />
  </div>
  <p v-else class="indented">
    Hmm, something went wrong! Try reloading?
  </p>
</template>

<script>
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import MoviesNominationListFestival from "./MoviesNominationListFestival";
import MoviesNominationListAward from "./MoviesNominationListAward";
import NominationListItem from "./NominationListItem";

export default {
  name: "MoviesNominationList",
  components: {
    MoviesNominationListAward,
    MoviesNominationListFestival,
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
      query() {
        return gql`
          query moviesNominations($condition: MoviesNominationCondition) {
            moviesNominations(
              condition: $condition
              orderBy: MOVIES_CATEGORY_BY_CATEGORY_ID__ORDER_DESC
            ) {
              totalCount
              nodes {
                ...moviesNomination
              }
            }
          }
          ${NominationListItem.fragments.moviesNomination}
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
        return (this.nominations = data.moviesNominations);
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
