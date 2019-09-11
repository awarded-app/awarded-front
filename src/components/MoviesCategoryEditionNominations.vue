<template>
  <article class="flex">
    <figure class="mr-2 mt-1 flex-none">
      <movie-link :movie-id="winnerNomination.movie.id" :movie-title="winnerNomination.movie.title">
        <movie-poster :tmdb-id="winnerNomination.movie.tmdbId" />
      </movie-link>
    </figure>

    <div>
      <h3 class="text-faded font-mono">
        <edition-link
          :edition-date="edition.date"
          :award-name-short="nameShort"
          :award-type="awardType"
          >{{ edition.date | year }}</edition-link
        >
      </h3>
      <div
        class="mb-2 flex"
        :class="display === 'movie' ? 'flex-col justify-start' : 'flex-col-reverse justify-end'"
      >
        <p :class="display === 'movie' ? 'font-semibold' : 'pl-6 text-faded'">
          <star v-if="display === 'movie'" :is-winner="true" />
          <movie-link
            :movie-id="winnerNomination.movie.id"
            :movie-title="winnerNomination.movie.title"
          />
        </p>
        <movies-nomination-credits
          :nominated-people="winnerNomination[`${this.awardType}NominatedPeople`].nodes"
          :has-star="display !== 'movie'"
          :show-prize="isFestival"
          :is-festival="isFestival"
          :display="display"
          :class="display === 'movie' ? 'pl-6' : 'font-semibold'"
          :award-type="awardType"
        />
      </div>
      <div class=" flex items-center mb-2" @click="showNominations = !showNominations">
        <plus-sign :is-open="showNominations" />
        <p>
          <a class="text-faded title-link cursor-pointer">
            Other Nominees
          </a>
        </p>
      </div>

      <ul v-if="showNominations" class="mb-4 indented">
        <li v-for="nomination in otherNominations" :key="nomination.id" class="mb-2">
          <p
            class="flex flex-wrap"
            :class="display === 'movie' ? 'flex-row justify-start' : 'flex-row-reverse justify-end'"
          >
            <span :class="display === 'movie' ? 'mr-2 font-semibold' : 'text-faded'">
              <star :is-winner="nomination.isWinner" class="mr-2" />
              <movie-link :movie-id="nomination.movie.id" :movie-title="nomination.movie.title" />
            </span>
          </p>
          <movies-nomination-credits
            :nominated-people="nomination[`${awardType}NominatedPeople`].nodes"
            :has-star="false"
            :show-prize="isFestival"
            :is-festival="isFestival"
            class="indented"
            :display="display"
            :class="display === 'movie' ? '' : 'font-semibold'"
            :award-type="awardType"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

<script>
import MoviePoster from "@/components/MoviePoster";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
import EditionLink from "@/components/EditionLink";
import MovieLink from "@/components/MovieLink";

export default {
  name: "MoviesCategoryEditionNominations",
  components: {
    MovieLink,
    EditionLink,
    MoviesNominationCredits,
    MoviePoster
  },
  props: {
    edition: {
      type: Object,
      required: true
    },
    nameShort: {
      type: String,
      required: true
    },
    display: {
      type: String,
      default: "movie"
    },
    isFestival: {
      type: Boolean,
      default: false
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showNominations: false
    };
  },
  computed: {
    winnerNomination() {
      const winners = this.edition[`${this.awardType}Nominations`].nodes.filter(
        nomination => nomination.isWinner
      );
      if (this.isFestival) {
        return winners.find(winner =>
          winner[`${this.awardType}NominatedPeople`].nodes.find(person => {
            if (person[`${this.awardType}NominatedPersonPrizes`].totalCount > 0) {
              return person[`${this.awardType}NominatedPersonPrizes`].nodes.some(
                ({ prize }) => prize.order === 0
              );
            }
          })
        );
      }
      return winners[0];
    },
    otherNominations() {
      return this.edition[`${this.awardType}Nominations`].nodes.filter(
        nomination => nomination.id !== this.winnerNomination.id
      );
    }
  }
};
</script>

<style lang="scss" scoped></style>
