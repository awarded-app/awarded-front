<template>
  <li class="mb-2 block">
    <article class="mb-2">
      <header class="sm:flex sm:items-center sm:flex-wrap mb-2">
        <div class="flex items-center">
          <plus-sign
            @click="showNominations = !showNominations"
            class="text-base"
          />
          <h3 class="mr-2">
            <edition-link
              :award-name-short="edition.award.nameShort"
              :edition-date="edition.date"
              >{{ edition.date | year }}</edition-link
            >
          </h3>
        </div>
        <p class="text-2xl  text-gray-500 pl-6 sm:pl-0">
          {{ edition.name }}
        </p>
      </header>
      <section class="w-full">
        <nomination-list v-if="showNominations" :edition="edition" />
      </section>
    </article>
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
          id
          nameShort
          isFestival
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
