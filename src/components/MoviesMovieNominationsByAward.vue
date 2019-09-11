<template>
  <div class="mb-2">
    <div class="flex items-center mb-1">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h4>
        <edition-link
          :award-name-short="awardNameShort"
          :edition-date="editionDate"
          award-type="movies"
        >
          {{ awardNameShort
          }}<span class="text-faded font-mono">
            {{ editionDate | year }}
          </span>
        </edition-link>
      </h4>
    </div>
    <section v-if="isOpen" class="indented mb-2">
      <ul class="text-xl">
        <li v-for="nomination in nominationsSorted" :key="nomination.id" class="flex mb-2">
          <star class="mr-2 text-lg" :is-winner="nomination.isWinner" />
          <div class="lg:flex lg:flex-wrap">
            <template v-if="isFestival">
              <movies-nomination-by-award-festival :nomination="nomination" />
            </template>
            <template v-else>
              <p class="mr-2">
                <category-link
                  :category-name="nomination.category.name"
                  :award-name-short="awardNameShort"
                  award-type="movies"
                  >{{ nomination.category.name }}</category-link
                >
              </p>
              <movies-nominated-people
                v-if="nomination.hasOwnProperty('moviesNominatedPeople')"
                :nominated-people="nomination.moviesNominatedPeople.nodes"
                class="text-faded"
              />
            </template>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import MoviesNominatedPeople from "@/components/MoviesNominatedPeople";
import CategoryLink from "@/components/CategoryLink";
import EditionLink from "@/components/EditionLink";
import MoviesNominationByAwardFestival from "@/components/MoviesNominationByAwardFestival";
export default {
  name: "MoviesMovieNominationsByAward",
  components: {
    EditionLink,
    CategoryLink,
    MoviesNominatedPeople,
    MoviesNominationByAwardFestival
  },
  props: {
    nominations: {
      type: Array,
      required: true
    },

  },
  data() {
    return {
      isOpen: true,
      awardNameShort: this.nominations[0].award.nameShort,
      editionDate: this.nominations[0].edition.date,
      isFestival: this.nominations[0].award.isFestival
    };
  },
  computed: {
    nominationsSorted() {
      return [...this.nominations].sort((a, b) => b.isWinner - a.isWinner);
    }
  },
  methods: {
    getYear(date) {
      const d = new Date(date);
      return d.getFullYear();
    },
    nominatedPeople(nomination) {
      if (nomination.isWinner) {
        const people = nomination.moviesNominatedPeople.nodes.filter(
          nominatedPerson => nominatedPerson.prize
        );
        let prizes = people.map(person => person.prize);
        prizes = prizes.filter(
          (prize, index, self) => index === self.findIndex(p => prize.id === p.id)
        );
        return {
          people,
          prizes
        };
      }
      return {
        people: nomination.moviesNominatedPeople.nodes,
        prizes: []
      };
    }
  }
};
</script>

