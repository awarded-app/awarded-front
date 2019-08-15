<template>
  <article class="flex" :class="nomination.winner ? 'mb-4' : 'mb-2'">
    <figure v-if="nomination.winner" class="mt-1 mr-2 hidden sm:block flex-none">
      <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">
        <movie-poster :tmdb-id="nomination.movie.tmdbId" w="100" />
      </movie-link>
    </figure>
    <section>
      <header class="flex items-center">
        <star
          v-if="!nomination.winner"
          :winner="nomination.winner"
          class="text-base mr-2 mb-1 md:mb-0"
        />
        <h4>
          <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title">{{
            nomination.movie.title
          }}</movie-link>
        </h4>
      </header>
      <nomination-credits
        :nominated-people="nomination.nominatedPeople.nodes"
        :has-star="true"
        :is-festival="true"
      />
    </section>
  </article>
</template>

<script>
import MovieLink from "@/components/MovieLink";
import MoviePoster from "@/components/MoviePoster";
import NominationCredits from "@/components/NominationCredits";
export default {
  name: "NominationFestival",
  components: { MovieLink, MoviePoster, NominationCredits },
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
          (prize, index, self) => index === self.findIndex(p => prize.id === p.id)
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
