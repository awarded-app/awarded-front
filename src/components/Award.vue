<template>
  <div>
    <div class="flex items-center mb-4">
      <plus-sign />
      <!-- <img :src="logoPath" :alt="logoAlt" /> -->
      <h1 @click="showEditions = !showEditions">{{ award.nameShort }}</h1>
    </div>
    <award-editions v-if="showEditions" :award-id="award.id" />
  </div>
</template>

<script>
import AwardEditions from "./AwardEditions";
import PlusSign from "./PlusSign";

export default {
  name: "Award",
  components: { AwardEditions, PlusSign },
  props: {
    award: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showEditions: false,
      logoPath: `https://awarded.imgix.net/awards/logos/${
        this.award.logo
      }?w=50&h=50`,
      logoAlt: `Logo for ${this.award.nameShort}`
    };
  }
};
</script>

<style lang="scss" scoped></style>
