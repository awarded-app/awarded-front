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
import AwardEditionNominationPerson from "./AwardEditionNominationPerson";
import AwardEditionNominationMovie from "./AwardEditionNominationMovie";

export default {
  name: "AwardEditionNomination",
  components: {
    AwardEditionNominationMovie,
    AwardEditionNominationPerson
  },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
