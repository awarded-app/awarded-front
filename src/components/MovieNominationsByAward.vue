<template>
  <div class="mb-2">
    <div class="flex items-center mb-1">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <h4>
        <edition-link :award-name-short="awardNameShort" :edition-date="editionDate">
          {{ awardNameShort
          }}<span class="text-gray-500 font-mono">
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
              <nomination-by-award-festival :nomination="nomination" :award-type="awardType" />
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
                v-if="nomination.hasOwnProperty('moviesNominatedPeople')"
                :nominated-people="nomination.moviesNominatedPeople.nodes"
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
import EditionLink from "@/components/EditionLink";
import NominationByAwardFestival from "@/components/NominationByAwardFestival";
export default {
  name: "MovieNominationsByAward",
  components: {
    EditionLink,
    CategoryLink,
    NominatedPeople,
    NominationByAwardFestival
  },
  props: {
    nominations: {
      type: Array,
      required: true
    },
    awardType: {
      type: String,
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

<style lang="scss" scoped></style>
