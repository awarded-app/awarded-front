<template>
  <div>
    <h3 class="flex items-center">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" class="-mt-2" />
      <router-link
        :to="`/award/${awardNameShort}/${$options.filters.year(editionDate)}`"
        tag="a"
        class="title-link"
      >
        {{ awardNameShort }}
        {{ editionDate | year }}
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

          <span class="md:mr-2">
            <category-link
              :category-name="nomination.category.name"
              :award-name-short="awardNameShort"
              >{{ nomination.category.name }}</category-link
            ></span
          >
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
import NominatedPeople from "@/components/NominatedPeople";
import CategoryLink from "@/components/CategoryLink";
export default {
  name: "MovieNominationsByAward",
  components: {
    CategoryLink,
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
      isOpen: true,
      awardNameShort: this.nominations[0].award.nameShort,
      editionDate: this.nominations[0].edition.date
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
