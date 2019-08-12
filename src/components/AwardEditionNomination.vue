<template>
  <p class="flex items-start lg:items-center">
    <star :winner="nomination.winner" class="mr-2 mt-1 text-base" />
    <award-edition-nomination-person :nomination="nomination" />
    <!-- <award-edition-nomination-movie v-else :nomination="nomination" /> -->
  </p>
</template>

<script>
import AwardEditionNominationPerson from "./AwardEditionNominationPerson";

export default {
  name: "AwardEditionNomination",
  components: {
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
