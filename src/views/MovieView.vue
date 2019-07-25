<template>
  <article class="pl-6 lg:pl-8">
    <breadcrumbs :prevScreenParams="prevScreenParams">{{
      movie.title
    }}</breadcrumbs>
    <header class="mb-2 flex sm:items-center">
      <nav class="-ml-6 pr-2 lg:-ml-8 lg:pr-4">
        <back-arrow :to="prevScreen" />
      </nav>
      <h2 class="flex items-center flex-wrap">
        <span class="mr-2">{{ movie.title }}</span>
        <span class="text-gray-500 leading-none mr-2">{{
          movie.releaseDate | year
        }}</span>
        <sup
          v-for="{ country } in movie.movieCountries.nodes"
          :key="country.id"
          class="text-base text-gray-500 mr-1"
          >{{ country.code }}</sup
        >
      </h2>
    </header>
    <main>
      <spinner v-if="$apollo.loading" />
      <template v-else>
        <section id="movie-details" class="sm:flex">
          <div class="mb-2 sm:mr-4">
            <movie-poster :tmdb-id="movie.tmdbId" w="200" />
          </div>
          <div class="sm:w-1/2">
            <p class="text-gray-500 mb-2">
              {{ movie.overview }}
            </p>
            <p v-if="movie.originalTitle !== movie.title" class="mb-2">
              <span class="mr-1">{{ movie.originalTitle }}</span
              ><span class="text-gray-500">Original Title</span>
            </p>
            <p class="text-gray-500 mb-2">{{ movie.runtime }} minutes</p>
            <movie-links-ratings
              :imdb-id="movie.imdbId"
              :tmdb-id="movie.tmdbId"
            />
            <movie-links-shopping
              v-if="movie.asin"
              :imdb-id="movie.imdbId"
              :movie-title="movie.title"
              :asin="movie.asin"
            />
          </div>
        </section>
        <section id="movie-nominations" class="pt-4">
          <div v-if="movieStats" class="block text-sm text-gray-700  mb-1">
            {{ movieStats.nominations }}
            {{ movieStats.nominations | pluralize("nomination") }}
            <span v-if="movieStats.wins">
              <span class="text-xs mx-1 text-gray-800">★</span>
              {{ movieStats.wins }}
              {{ movieStats.wins | pluralize("win") }}
            </span>
          </div>
          <div>
            <div
              v-for="(awardNominations, index) in nominationsByAward"
              :key="index"
              class="mb-4"
            >
              <movie-nominations-by-award :nominations="awardNominations" />
            </div>
          </div>
        </section>
      </template>
    </main>
  </article>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
import Spinner from "@/components/Spinner";
import MovieListItem from "@/components/MovieListItem";
import NominationListItem from "@/components/NominationListItem";
import MoviePoster from "@/components/MoviePoster";
import MovieLinksRatings from "@/components/MovieLinksRatings";
import MovieLinksShopping from "@/components/MovieLinksShopping";
import NominatedPerson from "../components/NominatedPerson";
import MovieNominationsByAward from "../components/MovieNominationsByAward";

export default {
  name: "MovieView",
  components: {
    MovieNominationsByAward,
    Spinner,
    MoviePoster,
    MovieLinksShopping,
    MovieLinksRatings
  },
  props: {
    title: {
      type: String,
      required: true
    },
    movie_id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      movie: {
        id: this.movie_id,
        title: this.title,
        releaseDate: null,
        nominations: {
          nodes: []
        },
        movieCountries: {
          nodes: []
        },
        asin: null
      },
      prevScreen: "",
      prevScreenParams: null
    };
  },
  apollo: {
    movie: {
      query: gql`
        query movie($id: Int!) {
          movie(id: $id) {
            ...movie
            nominations {
              totalCount
              nodes {
                ...nomination
                award {
                  id
                  nameLong
                  nameShort
                  isFestival
                }
                edition {
                  id
                  date
                  name
                }
              }
            }
          }
        }
        ${NominatedPerson.fragments.nominatedPerson}
        ${NominationListItem.fragments.nomination}
        ${MovieListItem.fragments.movie}
      `,
      variables() {
        return {
          id: Number(this.movie_id)
        };
      }
    }
  },
  computed: {
    nominationsByAward() {
      return this.groupByAward(this.movie.nominations.nodes);
    },
    movieStats() {
      if (this.$apollo.loading) return;
      let wins = 0;
      this.movie.nominations.nodes.map(nomination => {
        if (nomination.winner) {
          return (wins += 1);
        } else if (
          nomination.nominatedPeople.nodes.some(person => person.prize)
        ) {
          return (wins += 1);
        }
      });
      return { nominations: this.movie.nominations.totalCount, wins };
    }
  },
  methods: {
    groupByAward(nominations) {
      return Object.values(groupBy(nominations, "award.id"));
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevScreen = from.fullPath || "/";
      vm.prevScreenParams = from.params || null;
    });
  }
};
</script>

<style lang="scss" scoped></style>
