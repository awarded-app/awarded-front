<template>
  <div class="mb-4">
    <div class="flex items-center">
      <plus-sign/>
      <h2 @click="showNominations = !showNominations">{{ getYear(edition.date) }}</h2>
    </div>

    <p class="text-gray-500 ml-8">{{ edition.name }}</p>
    <award-edition-nominations-alt v-if="showNominations" :edition="edition"/>
  </div>
</template>

<script>
import AwardEditionNominationsAlt from "./AwardEditionNominationsAlt";
import PlusSign from "./PlusSign";
export default {
  components: {
    AwardEditionNominationsAlt,
    PlusSign
  },
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showNominations: false
    };
  },
  methods: {
    getYear(date) {
      const d = new Date(date);
      return d.getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped></style>
