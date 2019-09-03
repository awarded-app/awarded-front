<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs :prev-screen-params="prevScreenParams">{{ movie.title }}</breadcrumbs>
      <article>
        <header class="mb-2 flex sm:items-center">
          <h2 class="flex items-center flex-wrap">
            <span class="mr-2">{{ movie.title }}</span>
            <span class="text-faded leading-none mr-2 font-mono">{{
              movie.releaseDate | year
            }}</span>
            <template v-if="movie.moviesMovieCountries.totalCount > 0">
              <sup
                v-for="{ country } in movie.moviesMovieCountries.nodes"
                :key="country.id"
                class="text-faded mr-1 a-uppercase-info"
                >{{ country.code }}</sup
              >
            </template>
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
                <p class="text-faded mb-2">
                  {{ movie.overview }}
                </p>
                <p v-if="movie.originalTitle !== movie.title">
                  <span class="mr-1">{{ movie.originalTitle }}</span
                  ><span class="text-faded">Original Title</span>
                </p>
                <p v-if="movie.moviesMovieGenres.totalCount > 0" class="text-faded">
                  <span v-for="({ genre }, index) in movie.moviesMovieGenres.nodes" :key="index"
                    >{{ genre.name
                    }}<span v-if="index < movie.moviesMovieGenres.totalCount - 1">, </span></span
                  >
                </p>
                <p class="text-faded mb-2">{{ movie.runtime }} minutes</p>
                <movie-links-ratings
                  :imdb-id="movie.imdbId"
                  :tmdb-id="movie.tmdbId"
                  :title="movie.title"
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
              <div v-if="movieStats" class="text-faded mb-4 a-uppercase-info">
                {{ movieStats.nominations }}
                {{ movieStats.nominations | pluralize("nomination") }}
                <span v-if="movieStats.wins">
                  <span class="text-xs mx-1 text-gray-700">★</span>
                  {{ movieStats.wins }}
                  {{ movieStats.wins | pluralize("win") }}
                </span>
              </div>
              <div>
                <list-transition>
                  <div
                    v-for="(awardNominations, index) in nominationsByAward"
                    :key="index"
                    :data-index="index"
                    class="mb-4"
                  >
                    <movie-nominations-by-award
                      :nominations="awardNominations"
                      :award-type="awardType"
                    />
                  </div>
                </list-transition>
              </div>
            </section>
          </template>
        </main>
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner";
import MovieListItem from "@/components/MovieListItem";
import NominationListItem from "@/components/NominationListItem";
import MoviePoster from "@/components/MoviePoster";
import MovieLinksRatings from "@/components/MovieLinksRatings";
import MovieLinksShopping from "@/components/MovieLinksShopping";
import MovieNominationsByAward from "../components/MovieNominationsByAward";
import ListTransition from "../components/ListTransition";

export default {
  name: "MovieView",
  metaInfo() {
    const movieTitle = this.title;
    const movieYear = this.movieYear;
    return {
      title: `${movieTitle} (${movieYear}) - Nominations and Wins`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${movieTitle} (${movieYear}): nominations and wins in all Awards and Festivals.`
        }
      ]
    };
  },
  components: {
    MovieNominationsByAward,
    Spinner,
    MoviePoster,
    MovieLinksShopping,
    MovieLinksRatings,
    Layout,
    ListTransition
  },
  props: {
    title: {
      type: String,
      required: true
    },
    movieId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      awardType: `movies`,
      movie: {
        id: this.movie_id,
        title: this.title,
        releaseDate: null,
        moviesNominations: {
          nodes: []
        },
        moviesMovieCountries: {
          nodes: [],
          totalCount: 0
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
        query moviesMovie($id: Int!) {
          moviesMovie(id: $id) {
            ...movie
            moviesNominations {
              totalCount
              nodes {
                ...moviesNomination
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
        ${NominationListItem.fragments.moviesNomination}
        ${MovieListItem.fragments.movie}
      `,
      variables() {
        return {
          id: Number(this.movieId)
        };
      },
      update(data) {
        return (this.movie = data.moviesMovie);
      }
    }
  },
  computed: {
    nominationsByAward() {
      return this.groupByAward(this.movie.moviesNominations.nodes);
    },
    movieStats() {
      if (this.$apollo.loading) return;
      let wins = 0;
      this.movie.moviesNominations.nodes.map(nomination => {
        if (nomination.isWinner) {
          return (wins += 1);
        } else if (nomination.moviesNominatedPeople.nodes.some(person => person.prize)) {
          return (wins += 1);
        }
      });
      return { nominations: this.movie.moviesNominations.totalCount, wins };
    },
    movieYear() {
      if (this.movie.releaseDate) {
        return this.$options.filters.year(this.movie.releaseDate);
      }
      return "";
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
