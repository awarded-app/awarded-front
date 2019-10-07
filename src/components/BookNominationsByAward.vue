<template>
  <div class="mb-2">
    <div class="flex items-center mb-1">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h4>
        <edition-link
          :award-name-short="awardNameShort"
          :edition-official-year="editionOfficialYear"
          award-type="books"
        >
          {{ awardNameShort
          }}<span class="text-faded font-mono">
            {{ editionOfficialYear }}
          </span>
        </edition-link>
      </h4>
    </div>
    <section v-if="isOpen" class="indented mb-2">
      <ul class="text-xl">
        <li v-for="nomination in nominationsSorted" :key="nomination.id" class="flex mb-2">
          <star class="mr-2 text-lg" :is-winner="nomination.isWinner" />
          <div class="lg:flex lg:flex-wrap">
            <p class="mr-2">
              <category-link
                :category-name="nomination.category.name"
                :award-name-short="awardNameShort"
                award-type="books"
                class="mr-2"
                >{{
                  nomination.isWinner
                    ? nomination.booksNominationPrizes.nodes[0].prize.name
                    : nomination.category.name
                }}</category-link
              ><span v-if="!nomination.isWinner && nomination.isShortlisted" class="text-faded"
                >Shortlist</span
              ><span
                v-else-if="!nomination.isShortlisted && !nomination.isWinner"
                class="text-faded"
                >Longlist</span
              >
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import CategoryLink from "@/components/CategoryLink";
import EditionLink from "@/components/EditionLink";

export default {
  name: "BookNominationsByAward",
  components: {
    EditionLink,
    CategoryLink
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
      editionOfficialYear: this.nominations[0].edition.officialYear,
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
        const people = nomination.booksNominatedPeople.nodes.filter(
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
        people: nomination.booksNominatedPeople.nodes,
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
