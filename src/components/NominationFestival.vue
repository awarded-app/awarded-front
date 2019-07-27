<template>
  <ul class="lg:flex lg:items-center flex-wrap">
    <li
      :class="
        nomination.winner
          ? ''
          : 'flex flex-col items-start lg:flex-row lg:items-center'
      "
    >
      <h4 class="flex items-start mr-2 lg:items-center ">
        <star
          class="w-6 mr-1 mt-2 lg:mt-0 lg:mb-2 text-base"
          :winner="nomination.winner"
        />
        <movie-link
          :movie-id="nomination.movie.id"
          :movie-title="nomination.movie.title"
        />
      </h4>
      <!-- PEOPLE -->
      <ul
        class="flex flex-wrap text-xl pl-6 -mt-2 mb-4"
        :class="nomination.winner ? '' : 'lg:pl-0 lg:mt-0 lg:mb-2'"
      >
        <li
          v-if="
            nomination.winner &&
              nominatedPeople.prizes.length < nominatedPeople.people.length
          "
          class="mr-2"
        >
          {{ nominatedPeople.prizes[0].name }}
        </li>
        <li
          v-for="nominatedPerson in nominatedPeople.people"
          :key="nominatedPerson.id"
        >
          <span
            v-if="
              nominatedPerson.prize &&
                nominatedPeople.prizes.length === nominatedPeople.people.length
            "
            class="mr-2"
            >{{ nominatedPerson.prize.name }}</span
          ><span class="text-gray-500 mr-2">{{
            nominatedPerson.person.name
          }}</span>
          <span v-if="nominatedPerson.character" class="text-gray-500"
            >(as {{ nominatedPerson.character }})</span
          >
        </li>
      </ul>

    </li>
  </ul>
</template>

<script>
import MovieLink from "./MovieLink";
export default {
  name: "NominationFestival",
  components: {  MovieLink },
  props: {
    nomination: {
      type: Object,
      required: true
    }
  },
  computed: {
    nominatedPeople() {
      if (this.nomination.winner) {
        const people = this.nomination.nominatedPeople.nodes.filter(
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
        people: this.nomination.nominatedPeople.nodes,
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
