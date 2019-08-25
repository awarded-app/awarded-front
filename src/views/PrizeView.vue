<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs :prev-screen-params="{ nameShort, categoryName }">{{
        prizeName
      }}</breadcrumbs>
      <article>
        <header class="flex sm:items-center">
          <h2 class="flex items-center flex-wrap">
            <span class="mr-2">{{ prizeName }}</span>
            <span class="text-gray-500 leading-none mt-0"
              >{{ categoryName }} ({{ nameShort }})</span
            >
          </h2>
        </header>
        <spinner v-if="!prize" />
        <section v-else>
          <p class="text-gray-500 mb-4 md:w-2/3 lg:w-1/2">
            {{ prize.description }}
          </p>
          <p class="mb-4 md:w-2/3 lg:w-1/2 a-uppercase-info">
            Past editions winners
          </p>
          <ul>
            <li
              v-for="{ edition, movies } in groupedByEdition"
              :key="edition.id"
              class="mb-4"
            >
              <article class="flex">
                <div class="flex flex-col flex-none sm:flex-row">
                  <figure
                    v-for="{ movie } in movies"
                    :key="movie.id"
                    class="mr-2 mt-1 "
                  >
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
                      >{{ edition.date | year }}</edition-link
                    >
                  </h3>
                  <ul v-for="{ movie, nominations } in movies" :key="movie.id">
                    <li class="text-xl">
                      <div class="flex items-center mr-2">
                        <star :winner="true" />
                        <p class="font-semibold">
                          <movie-link
                            :movie-id="movie.id"
                            :movie-title="movie.title"
                            >{{ movie.title }}</movie-link
                          >
                        </p>
                      </div>
                      <nomination-credits
                        :nominated-people="nominations"
                        :has-star="false"
                        :show-prize="false"
                        :display="prize.display"
                        class="indented"
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
import AwardListItem from "@/components/AwardListItem";
import MoviePoster from "@/components/MoviePoster";
import NominationCredits from "@/components/NominationCredits";
import MovieLink from "@/components/MovieLink";
import EditionLink from "@/components/EditionLink";

export default {
  name: "PrizeView",

  metaInfo() {
    return {
      title: `${this.categoryName} - ${this.nameShort} - Winner and nominees`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.categoryName} winners and nominees in all editions of the ${this.nameShort}.`
        }
      ]
    };
  },
  components: {
    Spinner,
    MoviePoster,
    NominationCredits,
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
    }
  },
  data() {
    return {
      prevScreen: "",
      prevScreenParams: undefined,
      category: undefined,
      award: undefined,
      categoryId: undefined,
      prizeId: undefined,
      groupedByEdition: undefined,
      prize: undefined,
      allPrizeWinners: undefined
    };
  },
  methods: {
    groupByEdition(nominations) {
      let group = [];
      nominations.map(nomination => {
        const { id, character, job, person } = nomination;
        const edition = group.find(n => n.edition.id === nomination.edition.id);
        if (edition) {
          const movie = edition.movies.find(
            m => m.movie.id === nomination.movie.id
          );
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
      query: gql`
        query prize($id: Int!, $awardId: Int!, $categoryId: Int!) {
          prize(id: $id, awardId: $awardId, categoryId: $categoryId) {
            id
            name
            description
            display
            nominatedPersonPrizes {
              nodes {
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
            }
          }
        }
      `,
      variables() {
        return {
          id: this.prizeId,
          awardId: this.award.id,
          categoryId: this.categoryId
        };
      },
      skip: true,
      update(data) {
        this.allPrizeWinners = data.prize.nominatedPersonPrizes.nodes.map(
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
        return (this.prize = data.prize);
      }
    },
    awardByNameShort: {
      query: gql`
        query awardByNameShort($nameShort: String!) {
          awardByNameShort(nameShort: $nameShort) {
            ...award
            categories {
              nodes {
                id
                name
                prizes {
                  nodes {
                    id
                    name
                  }
                }
              }
            }
          }
        }
        ${AwardListItem.fragments.award}
      `,
      variables() {
        return {
          nameShort: this.nameShort
        };
      },
      update(data) {
        //console.log(this.$apollo.queries);
        this.award = { ...data.awardByNameShort };
        const category = this.award.categories.nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = category.id;
        const prize = category.prizes.nodes.find(
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
      vm.prevScreenParams = from.params || undefined;
    });
  }
};
</script>

<style lang="scss" scoped></style>
