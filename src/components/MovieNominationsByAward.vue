<template>
  <div class="pb-4">
    <div class="flex items-center mb-1">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h3>
        <router-link
          :to="`/award/${awardNameShort}/${$options.filters.year(editionDate)}`"
          tag="a"
          class="title-link"
        >
          {{ awardNameShort
          }}<span class="text-gray-500 font-mono">
            {{ editionDate | year }}
          </span>
        </router-link>
      </h3>
    </div>
    <section v-if="isOpen" class="indented">
      <ul class="text-xl">
        <li
          class="flex mb-2"
          v-for="nomination in nominationsSorted"
          :key="nomination.id"
        >
          <star class="mr-2 text-lg" :winner="nomination.winner" />
          <div class="lg:flex lg:flex-wrap">
            <template v-if="isFestival">
              <nomination-by-award-festival :nomination="nomination" />
            </template>
            <template v-else>
              <p class="mr-2">
                <category-link
                  :category-name="nomination.category.name"
                  :award-name-short="awardNameShort"
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
