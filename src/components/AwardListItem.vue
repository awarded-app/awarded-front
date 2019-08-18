<template>
  <li>
    <div class="flex items-center">
      <plus-sign
        :is-open="showEditions"
        @click="showEditions = !showEditions"
      />
      <h2 class="mr-2 leading-tight">
        <award-link :award-name-short="award.nameShort">
          {{ award.nameShort }}
        </award-link>
      </h2>
    </div>
    <p
      class="text-2xl text-gray-500 indented font-semibold"
      :class="showEditions ? 'mb-4' : 'mb-2'"
    >
      {{ award.nameLong }}
    </p>
    <edition-list
      v-if="showEditions"
      :award-id="award.id"
      class="-mt-2 mb-4 indented"
    />
  </li>
</template>

<script>
import gql from "graphql-tag";
import EditionList from "./EditionList";
import AwardLink from "./AwardLink";

export default {
  name: "AwardListItem",
  components: { EditionList, AwardLink },
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
