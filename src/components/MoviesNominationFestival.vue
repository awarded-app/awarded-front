<template>
  <article class="flex" :class="nomination.isWinner ? 'mb-4' : 'mb-2'">
    <figure v-if="nomination.isWinner" class="mt-1 mr-2 hidden sm:block flex-none">
      <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">
        <movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" />
      </movie-link>
    </figure>
    <section>
      <header class="flex items-center">
        <star
          v-if="!nomination.isWinner"
          :is-winner="nomination.isWinner"
          class="text-base mr-2 mb-1 md:mb-0"
        />
        <h4>
          <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">{{
            nomination.movie.title
          }}</movie-link>
        </h4>
      </header>
      <movies-nomination-credits
        :nominated-people="nomination.moviesNominatedPeople.nodes"
        :has-star="true"
        :is-festival="true"
      />
    </section>
  </article>
</template>

<script>
import MovieLink from "@/components/MovieLink";
import MoviePoster from "@/components/MoviePoster";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
export default {
  name: "MoviesNominationFestival",
  components: { MovieLink, MoviePoster, MoviesNominationCredits },
  props: {
    nomination: {
      type: Object,
      required: true
    },

  },
  computed: {
    nominatedPeople() {
      if (this.nomination.isWinner) {
        const people = this.nomination.moviesNominatedPeople.nodes.filter(
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
        people: this.nomination.moviesNominatedPeople.nodes,
        prizes: []
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
