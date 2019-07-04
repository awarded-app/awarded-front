<template>
  <div class="mb-4">
    <div class="flex items-center">
      <plus-sign @click="toggleNominations" />
      <button @click="toggleNominations" />
      <h2>
        <router-link
          class="title-link"
          tag="a"
          :to="`/award/${edition.award.nameShort}/${getYear(edition.date)}`"
          >{{ getYear(edition.date) }}</router-link
        >
      </h2>
    </div>
    <p class="text-gray-500 ml-6 lg:ml-8">{{ edition.name }}</p>
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
