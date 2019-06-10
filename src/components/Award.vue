<template>
  <div>
    <div class="flex items-center mb-4">
      <font-awesome-icon icon="plus" />
      <img :src="logoPath" :alt="logoAlt" />
      <span @click="showEditions = !showEditions">{{ award.nameShort }}</span>
    </div>
    <award-editions v-if="showEditions" :award-id="award.id" />
  </div>
</template>

<script>
import AwardEditions from "./AwardEditions";
export default {
  name: "Award",
  components: { AwardEditions },
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
