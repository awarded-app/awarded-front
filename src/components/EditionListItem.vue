<template>
  <li class="mb-2 block">
    <article class="mb-2">
      <header class="sm:flex sm:items-center sm:flex-wrap mb-2">
        <div class="flex items-center flex-wrap">
          <plus-sign
            :is-open="showNominations"
            class="text-base"
            @click="showNominations = !showNominations"
          />
          <h3 class="mr-2 font-mono">
            <edition-link
              :award-name-short="edition.award.nameShort"
              :edition-date="edition.date"
              >{{ edition.date | year }}</edition-link
            >
          </h3>
        </div>
        <p class="text-2xl pl-4 sm:pl-0 text-faded">
          {{ edition.name }}
        </p>
      </header>
      <section class="w-full">
        <nomination-list v-if="showNominations" :edition="edition" :award-type="awardType"/>
      </section>
    </article>
  </li>
</template>

<script>
//import gql from "graphql-tag";
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
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showNominations: false
    };
  },
  /* fragments: {
    edition: gql`
      fragment edition on Edition {
        id
        date
        name
        award {
          id
          nameShort
          isFestival
        }
      }
    `
  } */
};
</script>

<style lang="scss" scoped></style>
