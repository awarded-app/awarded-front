<template>
  <div class="pb-4">
    <h3 class="flex items-center">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" class="mb-2" />
      <router-link
        :to="`/award/${awardNameShort}/${$options.filters.year(editionDate)}`"
        tag="a"
        class="title-link"
      >
        {{ awardNameShort
        }}<span class="text-gray-500">
          {{ editionDate | year }}
        </span>
      </router-link>
    </h3>
    <section v-if="isOpen" class="pl-6 lg:pl-8">
      <ul class="text-xl">
        <li
          class="flex mb-2"
          v-for="nomination in nominationsSorted"
          :key="nomination.id"
        >
          <star class="mr-2 mt-1 text-lg" :winner="nomination.winner" />
          <div class="lg:flex lg:flex-wrap">
            <template v-if="isFestival">
              <nomination-by-award-festival :nomination="nomination" />
            </template>
            <template v-else>
              <p>
                <category-link
                  :category-name="nomination.category.name"
                  :award-name-short="awardNameShort"
                  class="mr-2"
                  >{{ nomination.category.name }}</category-link
                >
              </p>
              <nominatedPeople
                :nominated-people="nomination.nominatedPeople.nodes"
                class="text-gray-500"
              />
            </template>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import NominatedPeople from "@/components/NominatedPeople";
import CategoryLink from "@/components/CategoryLink";
import NominationByAwardFestival from "@/components/NominationByAwardFestival";
export default {
  name: "MovieNominationsByAward",
  components: {
    CategoryLink,
    NominatedPeople,
    NominationByAwardFestival
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
      editionDate: this.nominations[0].edition.date,
      isFestival: this.nominations[0].award.isFestival
    };
  },
  methods: {
    getYear(date) {
      const d = new Date(date);
      return d.getFullYear();
    },
    nominatedPeople(nomination) {
      if (nomination.winner) {
        const people = nomination.nominatedPeople.nodes.filter(
          nominatedPerson => nominatedPerson.prize
        );
        let prizes = people.map(person => person.prize);
        prizes = prizes.filter(
          (prize, index, self) =>
            index === self.findIndex(p => prize.id === p.id)
        );
        return {
          people,
          prizes
        };
      }
      return {
        people: nomination.nominatedPeople.nodes,
        prizes: []
      };
    }
  },
  computed: {
    nominationsSorted() {
      return [...this.nominations].sort((a, b) => b.winner - a.winner);
    }
  }
};
</script>

<style lang="scss" scoped></style>
