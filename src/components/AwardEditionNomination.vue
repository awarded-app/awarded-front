<template>
  <div class="flex items-center">
    <award-edition-nomination-person
      v-if="nomination.category.display === 'person'"
      :nomination="nomination"
    />
    <award-edition-nomination-movie v-else :nomination="nomination" />
  </div>
</template>

<script>
import AwardEditionNominationPerson from "./AwardEditionNominationPerson";
import AwardEditionNominationMovie from "./AwardEditionNominationMovie";

export default {
  name: "AwardEditionNomination",
  components: { AwardEditionNominationMovie, AwardEditionNominationPerson },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
