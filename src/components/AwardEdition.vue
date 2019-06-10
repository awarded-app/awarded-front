<template>
  <li>
    <font-awesome-icon icon="plus" />
    <span @click="showNominations = !showNominations"
      >{{ getYear(edition.date) }} - {{ edition.name }}</span
    >
    <award-edition-nominations v-if="showNominations" :edition="edition" />
  </li>
</template>

<script>
import AwardEditionNominations from "./AwardEditionNominations";
export default {
  components: {
    AwardEditionNominations
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
