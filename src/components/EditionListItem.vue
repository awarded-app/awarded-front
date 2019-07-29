<template>
  <li class="mb-2">
    <article class="sm:flex sm:items-center sm:flex-wrap -ml-6 lg:-ml-8 mb-2">
      <header class="flex items-center flex-wrap">
        <plus-sign @click="showNominations = !showNominations" />
        <h3 class="mr-2">
          <edition-link :award-name-short="edition.award.nameShort" :edition-date="edition.date">{{
            edition.date | year
          }}</edition-link>
        </h3>
      </header>
      <p class="text-2xl leading-tight text-gray-500 pl-6 sm:pl-0">
        {{ edition.name }}
      </p>
    </article>
    <nomination-list v-if="showNominations" :edition="edition" />
  </li>
</template>

<script>
import gql from "graphql-tag";
import NominationList from "./NominationList";
import EditionLink from "@/components/EditionLink";

export default {
  name: "EditionListItem",
  components: {
    NominationList,
    EditionLink
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
  fragments: {
    edition: gql`
      fragment edition on Edition {
        id
        date
        name
        award {
          nameShort
          isFestival
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
