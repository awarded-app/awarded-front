<template>
  <li>
    <div class="flex items-center mb-2 -ml-6 lg:-ml-8">
      <plus-sign @click="showEditions = !showEditions" class="lg:mr-2" />
      <h2 class="lg:ml-2">
        <router-link
          class="title-link"
          tag="a"
          :to="`/award/${award.nameShort}`"
          >{{ award.nameShort }}</router-link
        >
      </h2>
    </div>
    <edition-list v-if="showEditions" :award-id="award.id" class="-mt-2 mb-4" />
  </li>
</template>

<script>
import gql from "graphql-tag";
import EditionList from "./EditionList";

export default {
  name: "AwardListItem",
  components: { EditionList },
  props: {
    award: {
      type: Object,
      required: true
    }
  },
  fragments: {
    award: gql`
      fragment award on Award {
        nodeId
        id
        link
        logo
        nameLong
        nameShort
        description
        country {
          id
          code
          name
        }
        isFestival
      }
    `
  },
  data() {
    return {
      showEditions: false,
      logoPath: `https://awarded.imgix.net/awards/logos/${this.award.logo}?w=50&h=50`,
      logoAlt: `Logo for ${this.award.nameShort}`
    };
  }
};
</script>

<style lang="scss" scoped></style>
