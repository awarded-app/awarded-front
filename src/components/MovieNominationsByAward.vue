<template>
  <div>
    <h2 class="flex items-center">
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
    </h2>
    <section v-if="isOpen">
      <div
        v-for="nomination in nominations"
        :key="nomination.id"
        class="pl-6 lg:pl-8 md:flex md:items-center md:flex-wrap"
      >
        <h3 class="flex items-center">
          <span class="w-6 -mt-2">
            <star :winner="nomination.winner" />
          </span>
          <span class="md:mr-2">{{ nomination.category.name }}</span>
        </h3>
        <h3 class="text-gray-500">
          <nominated-people
            :nominated-people="nomination.nominatedPeople.nodes"
          />
        </h3>
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
