<template>
  <spinner v-if="$apollo.loading" class="mt-4" />
  <div v-else>
    <section id="person" class="sm:flex">
      <figure class="mb-2 mt-2 sm:mr-4 flex-none">
        <person-headshot :profile-path="person.profilePath" w="200" />
      </figure>
      <section class="lg:w-2/3">
        <header class="mb-2 flex sm:items-center">
          <h2 class="flex items-center flex-wrap leading-tight">
            <span class="mr-2">{{ personName }}</span>
          </h2>
        </header>

        <p v-if="person.biography" class="text-faded mb-2">
          {{ person.biography }}
        </p>

        <p v-if="person.deathday"><span class="text-faded">Deathday</span> {{ person.deathday | formatDate("MMMM do, yyyy") }}</p>
        <p v-else-if="person.birthday">
          {{ person.birthday | age }}<span class="text-faded "> years old</span>
        </p>
        <p v-if="person.placeOfBirth" class="mb-2">
          <span class="text-faded">From</span>
          {{ person.placeOfBirth }}
        </p>
        <p>
          <person-social-links :tmdb-id="person.tmdbId" :imdb-id="person.imdbId" />
        </p>
      </section>
    </section>
    <!-- NOMINATIONS -->
    <section id="movie-nominations" class="pt-4">
      <p class="text-faded mb-4 a-uppercase-info">
        {{ stats.nominations | pluralize("nomination", { includeNumber: true }) }}
        <star-separator />{{ stats.wins | pluralize("win", { includeNumber: true }) }}
      </p>
      <div class="lg:flex lg:flex-wrap">
        <div
          v-for="(movieGroup, index) in nominationsByMovie"
          :key="index"
          class="w-50% lg:mr-4 mb-4"
        >
          <div class="md:flex">
            <div class="mr-2 flex-none">
              <movie-link :movie-id="movieGroup.movie.id" :movie-title="movieGroup.movie.title">
                <movie-poster :tmdb-id="movieGroup.movie.tmdbId" w="100" />
              </movie-link>
            </div>
            <div>
              <h3 class="mb-1">
                <movie-link :movie-id="movieGroup.movie.id" :movie-title="movieGroup.movie.title">
                  {{ movieGroup.movie.title }}
                </movie-link>
              </h3>
              <div v-for="({ nominations }, i) in movieGroup.nominations" :key="i">
                <movies-movie-nominations-by-award :nominations="nominations" award-type="movies" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
const orderBy = require("lodash.orderby");
import Spinner from "@/components/Spinner";
import PersonSocialLinks from "@/components/PersonSocialLinks";
import PersonHeadshot from "@/components/PersonHeadshot";
import MoviePoster from "@/components/MoviePoster";
import MovieLink from "@/components/MovieLink";
import StarSeparator from "@/components/StarSeparator";
import MoviesMovieNominationsByAward from "@/components/MoviesMovieNominationsByAward";

export default {
  name: "MoviesPerson",
  components: {
    Spinner,
    PersonHeadshot,
    PersonSocialLinks,
    MoviesMovieNominationsByAward,
    StarSeparator,
    MovieLink,
    MoviePoster,
  },
  props: {
    personId: {
      type: String,
      required: true
    },
    personName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      person: {
        id: Number(this.personId),
        name: this.personName
      },
      prevScreen: "",
      prevScreenParams: null,
      nominations: []
    };
  },
  apollo: {
    person: {
      query: gql`
        query moviesPerson($id: Int!) {
          moviesPerson(id: $id) {
            id
            tmdbId
            imdbId
            name
            gender
            biography
            birthday
            deathday
            alsoKnownAs
            adult
            homepage
            knownForDepartment
            placeOfBirth
            popularity
            profilePath
          }
        }
      `,
      variables() {
        return {
          id: Number(this.personId)
        };
      },
      update(data) {
        return (this.person = data.moviesPerson);
      }
    },
    nominatedPeople: {
      query() {
        return gql`
          query moviesNominatedPeople($condition: MoviesNominatedPersonCondition) {
            moviesNominatedPeople(condition: $condition) {
              totalCount
              nodes {
                moviesNominatedPersonPrizes {
                  nodes {
                    prize {
                      id
                      name
                    }
                  }
                  totalCount
                }
                nomination {
                  id
                  isWinner
                  edition {
                    id
                    name
                    date
                    officialYear
                    publish
                  }
                  award {
                    id
                    nameShort
                    isFestival
                  }
                  category {
                    id
                    name
                    display
                    important
                    order
                  }
                  movie {
                    id
                    tmdbId
                    title
                  }
                }
              }
            }
          }
        `;
      },
      variables() {
        return {
          condition: { personId: this.person.id }
        };
      },
      update(data) {
        return (this.nominations = data.moviesNominatedPeople.nodes.map(node => {
          return {
            ...node.nomination,
            prizes: { ...node.moviesNominatedPersonPrizes }
          };
        }));
      }
    }
  },
  computed: {
    nominationsByMovie() {
      if (!this.nominations) return null;
      let sortedNominations = Object.values(groupBy(this.nominations, "movie.id"));
      sortedNominations = sortedNominations.map(nomination => {
        return {
          movie: { ...nomination[0].movie },
          nominations: orderBy(nomination, "isWinner", "desc")
        };
      });

      for (const movie of sortedNominations) {
        let nomByAward = Object.values(groupBy(movie.nominations, "award.id"));
        nomByAward = nomByAward.map(award => {
          return {
            award: { ...award[0].award },
            edition: { ...award[0].edition },
            nominations: award
          };
        });
        movie.nominations = nomByAward;
      }

      sortedNominations = orderBy(sortedNominations, "nominations[0].edition.date", "desc");
      return sortedNominations;
    },

    stats() {
      if (!this.nominations) return null;
      return this.getStats(this.nominations);
    }
  },
  methods: {
    groupByAward(nominations) {
      return Object.values(groupBy(nominations, "award.id"));
    },
    orderByEditionDate(nominations) {
      return orderBy(nominations, "edition.date");
    },
    getStats(nominations) {
      const stats = { nominations: nominations.length, wins: 0 };
      stats.wins = nominations.filter(nomination => nomination.isWinner).length;
      return stats;
    }
  }
};
</script>

<style lang="scss" scoped></style>
