<template>
  <div class="mb-2">
    <div class="sm:flex sm:items-center sm:flex-wrap">
      <div class="flex items-center flex-wrap">
        <plus-sign @click="toggleNominations" />
        <h2>
          <router-link
            class="title-link"
            tag="a"
            :to="`/award/${edition.award.nameShort}/${getYear(edition.date)}`"
            >{{ getYear(edition.date) }}</router-link
          >
        </h2>
      </div>
      <h2 class="block text-gray-500 ml-6 sm:ml-2">{{ edition.name }}</h2>
    </div>
    <award-edition-nominations v-if="showNominations" :edition="edition" />
  </div>
</template>

<script>
import gql from "graphql-tag";
import AwardEditionNominations from "./AwardEditionNominations";
import PlusSign from "./PlusSign";
export default {
  components: {
    AwardEditionNominations,
    PlusSign
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
          nameShort
        }
      }
    `
  },
  methods: {
    getYear(date) {
      const d = new Date(date);
      return d.getFullYear();
    },
    toggleNominations() {
      this.showNominations = !this.showNominations;
    }
  }
};
</script>

<style lang="scss" scoped></style>
