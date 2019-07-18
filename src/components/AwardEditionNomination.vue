<template>
  <h5 class="flex items-start lg:items-center">
    <star :winner="nomination.winner" class="mr-2 pt-2 lg:pt-0 text-sm" />
    <award-edition-nomination-person
      v-if="nomination.category.display === 'person'"
      :nomination="nomination"
    />
    <award-edition-nomination-movie v-else :nomination="nomination" />
  </h5>
</template>

<script>
import gql from "graphql-tag";
import AwardEditionNominationPerson from "./AwardEditionNominationPerson";
import AwardEditionNominationMovie from "./AwardEditionNominationMovie";
import NominatedPerson from "./NominatedPerson";
import Star from "./Star";

export default {
  name: "AwardEditionNomination",
  components: {
    AwardEditionNominationMovie,
    AwardEditionNominationPerson,
    Star
  },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  },
  fragments: {
    nomination: gql`
      fragment nomination on Nomination {
        id
        movie {
          ...movie
        }
        nominatedPeople {
          nodes {
            ...nominatedPerson
          }
        }
        category {
          id
          name
          important
          order
          display
        }
        winner
      }
      ${AwardEditionNominationMovie.fragments.movie}
      ${NominatedPerson.fragments.nominatedPerson}
    `
  }
};
</script>

<style lang="scss" scoped></style>
