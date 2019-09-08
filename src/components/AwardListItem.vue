<template>
  <li>
    <div class="flex flex-no-wrap items-center justify-start">
      <plus-sign :is-open="showEditions" @click="showEditions = !showEditions" />
      <h2 class="mr-2 self-start flex-1 leading-tight">
        <award-link :award-name-short="award.nameShort" :award-type="awardType">{{
          award.nameShort
        }}</award-link>
      </h2>
    </div>
    <!-- <p
      class="text-2xl text-faded indented font-semibold"
      :class="showEditions ? 'mb-4' : 'mb-2'"
    >
      {{ award.nameLong }}
    </p> -->
    <p class="indented text-faded mb-4 mt-2 lg:w-2/3 xl:w-1/2">
      {{ award.summary }}
    </p>
    <edition-list
      v-if="showEditions"
      :award-id="award.id"
      :award-type="awardType"
      class="-mt-2 mb-4 indented"
    />
  </li>
</template>

<script>
//import gql from "graphql-tag";
import EditionList from "./EditionList";
import AwardLink from "./AwardLink";

export default {
  name: "AwardListItem",
  components: { EditionList, AwardLink },
  props: {
    award: {
      type: Object,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
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
