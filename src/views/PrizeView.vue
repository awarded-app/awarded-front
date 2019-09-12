<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs :prev-screen-params="{ nameShort, categoryName }">{{ prizeName }}</breadcrumbs>
      <article>
        <header class="flex sm:items-center">
          <h2 class="flex items-center flex-wrap">
            <span class="mr-2">{{ prizeName }}</span>
            <span class="text-faded leading-none mt-0">{{ categoryName }} ({{ nameShort }})</span>
          </h2>
        </header>
        <spinner v-if="!prize" />
        <section v-else>
          <p class="text-faded mb-4 md:w-2/3 lg:w-1/2">
            {{ prize.description }}
          </p>
          <p class="mb-4 md:w-2/3 lg:w-1/2 a-uppercase-info">
            Past editions winners
          </p>
          <ul>
            <li v-for="{ edition, movies } in groupedByEdition" :key="edition.id" class="mb-4">
              <article class="flex">
                <div class="flex flex-col flex-none sm:flex-row">
                  <figure v-for="{ movie } in movies" :key="movie.id" class="mr-2 mt-1 ">
                    <movie-link :movie-id="movie.id" :movie-title="movie.title">
                      <movie-poster :tmdb-id="movie.tmdbId" w="100" />
                    </movie-link>
                  </figure>
                </div>
                <section>
                  <h3 class="font-mono">
                    <edition-link
                      :edition-date="edition.date"
                      :award-name-short="edition.award.nameShort"
                      :award-type="awardType"
                      >{{ edition.date | year }}</edition-link
                    >
                  </h3>
                  <ul v-for="{ movie, nominations } in movies" :key="movie.id">
                    <li class="text-xl">
                      <div class="flex items-center mr-2">
                        <star :is-winner="true" />
                        <p class="font-semibold">
                          <movie-link :movie-id="movie.id" :movie-title="movie.title">{{
                            movie.title
                          }}</movie-link>
                        </p>
                      </div>
                      <movies-nomination-credits
                        :nominated-people="nominations"
                        :has-star="false"
                        :show-prize="false"
                        :display="prize.display"
                        class="indented"
                        :award-type="awardType"
                      />
                    </li>
                  </ul>
                </section>
              </article>
            </li>
          </ul>
        </section>
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner.vue";
import MoviePoster from "@/components/MoviePoster";
import MoviesNominationCredits from "@/components/MoviesNominationCredits";
import MovieLink from "@/components/MovieLink";
import EditionLink from "@/components/EditionLink";

// TODO: create books fragment
const FRAGMENTS = {
  moviesNominatedPersonPrize: gql`
    fragment moviesNominatedPersonPrize_prizeView on MoviesNominatedPersonPrize {
      id
      nominatedPerson {
        id
        character
        job {
          id
          name
        }
        person {
          id
          name
        }
        nomination {
          id
          edition {
            id
            date
            name
            award {
              id
              nameShort
            }
          }
          movie {
            id
            tmdbId
            title
          }
        }
      }
    }
  `
};

export default {
  name: "PrizeView",

  metaInfo() {
    return {
      title: `${this.categoryName} - ${this.nameShort} - Winner and nominees`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.categoryName} winners and nominees in all editions of the ${
            this.nameShort
          }`
        }
      ]
    };
  },
  components: {
    Spinner,
    MoviePoster,
    MoviesNominationCredits,
    MovieLink,
    EditionLink,
    Layout
  },
  props: {
    categoryName: {
      type: String,
      required: true
    },
    nameShort: {
      type: String,
      required: true
    },
    prizeName: {
      type: String,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prevScreen: "",
      prevScreenParams: null,
      category: null,
      award: null,
      categoryId: null,
      prizeId: null,
      groupedByEdition: null,
      prize: null,
      allPrizeWinners: null
    };
  },
  methods: {
    groupByEdition(nominations) {
      let group = [];
      nominations.map(nomination => {
        const { id, character, job, person } = nomination;
        const edition = group.find(n => n.edition.id === nomination.edition.id);
        if (edition) {
          const movie = edition.movies.find(m => m.movie.id === nomination.movie.id);
          if (movie) {
            movie.nominations.push({
              ...nomination
            });
          } else {
            edition.movies = [
              ...edition.movies,
              {
                movie: { ...nomination.movie },
                nominations: [{ id, character, job, person }]
              }
            ];
          }
        } else {
          group.push({
            edition: { ...nomination.edition },
            movies: [
              {
                movie: { ...nomination.movie },
                nominations: [{ id, character, job, person }]
              }
            ]
          });
        }
      });
      group = group.sort((a, b) => {
        const aYear = new Date(a.edition.date).getFullYear();
        const bYear = new Date(b.edition.date).getFullYear();
        return bYear - aYear;
      });
      return group;
    }
  },
  apollo: {
    prize: {
      query() {
        const nominatedPersonPrizeFragment = FRAGMENTS[`${this.awardType}NominatedPersonPrize`];
        return gql`
          query ${this.awardType}Prize($id: Int!) {
            ${this.awardType}Prize(id: $id) {
              id
              name
              description
              display
              ${this.awardType}NominatedPersonPrizes {
                nodes {
                  ...${this.awardType}NominatedPersonPrize_prizeView
                }
              }
            }
          }
          ${nominatedPersonPrizeFragment}
        `;
      },
      variables() {
        return {
          id: this.prizeId,
          awardId: this.award.id,
          categoryId: this.categoryId
        };
      },
      skip: true,
      update(data) {
        this.prize = data[`${this.awardType}Prize`];
        this.allPrizeWinners = this.prize[`${this.awardType}NominatedPersonPrizes`].nodes.map(
          ({
            nominatedPerson: {
              id,
              character,
              job,
              person,
              nomination: { edition, movie }
            }
          }) => {
            return {
              id,
              character,
              job,
              person,
              edition,
              movie
            };
          }
        );
        this.groupedByEdition = this.groupByEdition(this.allPrizeWinners);
        return this.prize;
      }
    },
    awardByNameShort: {
      query() {
        return gql`
          query ${this.awardType}AwardByNameShort($nameShort: String!) {
            ${this.awardType}AwardByNameShort(nameShort: $nameShort) {
              id
              isFestival
              ${this.awardType}Categories {
                nodes {
                  id
                  name
                  ${this.awardType}Prizes {
                    nodes {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        `;
      },

      variables() {
        return {
          nameShort: this.nameShort
        };
      },
      update(data) {
        //console.log(this.$apollo.queries);
        this.award = data[`${this.awardType}AwardByNameShort`];
        const category = this.award[`${this.awardType}Categories`].nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = category.id;
        const prize = category[`${this.awardType}Prizes`].nodes.find(
          prize => prize.name === this.prizeName
        );
        this.prizeId = prize.id;
        this.$apollo.queries.prize.skip = false;
      }
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
