<template>
  <spinner v-if="$apollo.loading" />
  <section v-else>
    <p class="text-faded mb-4 md:w-2/3 lg:w-1/2">
      {{ category.description }}
    </p>
    <p class="mb-4 md:w-2/3 lg:w-1/2 text-faded a-uppercase-info">
      Winners and nominees from past editions
    </p>
    <ul>
      <list-transition>
        <li
          v-for="({ edition }, index) in category.moviesEditionCategories.nodes"
          :key="edition.id"
          :data-index="index"
          class="mb-8"
        >
          <movies-category-edition-nominations
            :edition="edition"
            :name-short="award.nameShort"
            :is-festival="award.isFestival"
            :display="category.display"
            award-type="movies"
          />
        </li>
      </list-transition>
    </ul>
  </section>
</template>

<script>
import gql from "graphql-tag";
const groupBy = require("lodash.groupby");
import Spinner from "@/components/Spinner";
import ListTransition from "@/components/ListTransition";
import MoviesCategoryEditionNominations from "@/components/MoviesCategoryEditionNominations";
import MovieListItem from "../components/MovieListItem";
import MoviesNominatedPerson from "../components/MoviesNominatedPerson";

export default {
  name: "MoviesCategoryNominations",
  components: {
    Spinner,
    ListTransition,
    MoviesCategoryEditionNominations
  },
  props: {
    categoryId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      award: null,
      category: null
    };
  },
  methods: {
    getWinner(nominations) {
      return nominations.find(nomination => nomination.isWinner);
    },
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    }
  },
  apollo: {
    category: {
      query: gql`
        query moviesCategory($id: Int!, $nCondition: MoviesNominationCondition) {
          moviesCategory(id: $id) {
            id
            description
            display
            moviesEditionCategories(
              condition: { complete: true }
              orderBy: MOVIES_EDITION_BY_EDITION_ID__DATE_DESC
            ) {
              nodes {
                edition {
                  id
                  date
                  officialYear
                  name
                  publish
                  moviesNominations(condition: $nCondition) {
                    totalCount
                    nodes {
                      id
                      isWinner
                      movie {
                        ...movie
                      }
                      moviesNominatedPeople {
                        nodes {
                          ...moviesNominatedPerson
                          nomination {
                            id
                            category {
                              id
                              display
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            award {
              id
              isFestival
              nameShort
            }
          }
        }
        ${MovieListItem.fragments.movie}
        ${MoviesNominatedPerson.fragments.moviesNominatedPerson}
      `,
      variables() {
        return {
          id: this.categoryId,
          nCondition: { categoryId: this.categoryId }
        };
      },
      update(data) {
        this.category = data.moviesCategory;
        this.award = this.category.award;
        return this.category;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
