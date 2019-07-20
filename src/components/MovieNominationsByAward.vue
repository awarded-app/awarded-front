<template>
  <div>
    <h3 class="flex items-center">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" class="-mt-2" />
      <router-link
        :to="
          `/award/${nominations[0].award.nameShort}/${getYear(
            nominations[0].edition.date
          )}`
        "
        tag="a"
        class="title-link"
      >
        {{ nominations[0].award.nameShort }}
        {{ nominations[0].edition.date | year }}
      </router-link>
    </h3>
    <section v-if="isOpen">
      <div
        v-for="nomination in nominations"
        :key="nomination.id"
        class="pl-6 lg:pl-8 md:flex md:items-center md:flex-wrap"
      >
        <h4 class="flex items-center">
          <star :winner="nomination.winner" class="text-sm mr-1" />

          <span class="md:mr-2">{{ nomination.category.name }}</span>
        </h4>
        <h4 class="text-gray-500">
          <nominated-people
            :nominated-people="nomination.nominatedPeople.nodes"
          />
        </h4>
      </div>
    </section>
  </div>
</template>

<script>
import NominatedPeople from "../components/NominatedPeople";
export default {
  name: "MovieNominationsByAward",
  components: {
    NominatedPeople
  },
  props: {
    nominations: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    getYear(date) {
      const d = new Date(date);
      return d.getFullYear();
    }
  }
};
</script>

<style lang="scss" scoped></style>
