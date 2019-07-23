<template>
  <li class="mb-2">
    <div class="sm:flex sm:items-center sm:flex-wrap  -ml-6 lg:-ml-8">
      <div class="flex items-center flex-wrap">
        <plus-sign
          @click="showNominations = !showNominations"
          class="lg:mr-2"
        />
        <h3 class="lg:ml-2">
          <router-link
            class="title-link"
            tag="a"
            :to="
              `/award/${edition.award.nameShort}/${$options.filters.year(
                edition.date
              )}`
            "
            >{{ edition.date | year }}</router-link
          >
        </h3>
      </div>
      <h3 class="block text-gray-500 ml-6 sm:ml-2">{{ edition.name }}</h3>
    </div>
    <nomination-list v-if="showNominations" :edition="edition" />
  </li>
</template>

<script>
import gql from "graphql-tag";
import NominationList from "./NominationList";
//import AwardListItem from "./AwardListItem";

export default {
  name: "EditionListItem",
  components: {
    NominationList
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
        date
        name
        id
        poster
        award {
          ...award
        }
      }
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
  }
};
</script>

<style lang="scss" scoped></style>
