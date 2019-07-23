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
        <li>
          <p class="mr-2 mb-1">
            <movie-link
              :movie-id="nominations[0].nomination.movie.it"
              :movie-title="nominations[0].nomination.movie.title"
            ></movie-link>
          </p>
        </li>
        <li
          class="flex mb-2"
          v-for="nomination in nominationsSorted"
          :key="nomination.id"
        >
          <star
            class="mr-2 mt-1 text-lg"
            :winner="nomination.nomination.winner"
          />
          <div class="lg:flex lg:flex-wrap">
            <template v-if="isFestival">
              <p class="mr-2" v-if="nomination.prize">
                {{ nomination.prize.name }}
              </p>
              <p class="text-gray-500">
                <category-link
                  :category-name="nomination.nomination.category.name"
                  :award-name-short="awardNameShort"
                  class="mr-2"
                  >{{ nomination.nomination.category.name }}</category-link
                >
              </p>
            </template>
            <template v-else>
              <p class="text-gray-500">
                <category-link
                  :category-name="nomination.nomination.category.name"
                  :award-name-short="awardNameShort"
                  class="mr-2"
                  >{{ nomination.nomination.category.name }}</category-link
                >
              </p>
            </template>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import CategoryLink from "@/components/CategoryLink";
import MovieLink from "@/components/MovieLink";
import NominationByAwardFestival from "@/components/NominationByAwardFestival";
export default {
  name: "PersonNominationsByAward",
  components: {
    MovieLink,
    CategoryLink,
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
      awardNameShort: this.nominations[0].nomination.award.nameShort,
      editionDate: this.nominations[0].nomination.edition.date,
      isFestival: this.nominations[0].nomination.award.isFestival
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
      return [...this.nominations].sort(
        (a, b) => b.nomination.winner - a.nomination.winner
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
