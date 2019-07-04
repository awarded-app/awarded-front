<template>
  <div>
    <div class="flex items-center mb-4">
      <plus-sign @click="toggleEditions" />
      <h1>
        <router-link
          class="title-link"
          tag="a"
          :to="`/award/${award.nameShort}`"
          >{{ award.nameShort }}</router-link
        >
      </h1>
    </div>
    <award-editions
      v-if="showEditions"
      :award-id="award.id"
      class="pl-6 lg:pl-8"
    />
  </div>
</template>

<script>
import gql from "graphql-tag";
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
  fragments: {
    award: gql`
      fragment award on Award {
        id
        link
        logo
        nameLong
        nameShort
        nodeId
        description
        country {
          id
          code
          name
        }
      }
    `
  },
  data() {
    return {
      showEditions: false,
      logoPath: `https://awarded.imgix.net/awards/logos/${
        this.award.logo
      }?w=50&h=50`,
      logoAlt: `Logo for ${this.award.nameShort}`
    };
  },
  methods: {
    toggleEditions() {
      this.showEditions = !this.showEditions;
    }
  }
};
</script>

<style lang="scss" scoped></style>
