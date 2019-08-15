<template>
  <div>
    <breadcrumbs :prev-screen-params="{ nameShort }">{{
      categoryName
    }}</breadcrumbs>
    <article>
      <header class="flex sm:items-center">
        <back-arrow :to="prevScreen" />

        <h2 class="flex items-center flex-wrap">
          <span class="mr-2">{{ categoryName }}</span>
          <span class="text-gray-500 leading-none mt-0">{{ nameShort }}</span>
        </h2>
      </header>
      <spinner v-if="!category" class="indented" />
      <section v-else class="indented">
        <p class="text-gray-500 mb-4 md:w-2/3 lg:w-1/2">
          {{ category.description }}
        </p>
        <p class="mb-4 md:w-2/3 lg:w-1/2 text-gray-500 a-uppercase-info">
          Winners and nominees from past editions
        </p>
        <ul>
          <li
            v-for="{ edition } in category.editionCategories.nodes"
            :key="edition.id"
            class="mb-8"
          >
            <category-edition-nomination-list
              :edition="edition"
              :name-short="nameShort"
              :is-festival="award.isFestival"
              :display="category.display"
            />
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
const groupBy = require("lodash.groupby");
import gql from "graphql-tag";
import Spinner from "@/components/Spinner.vue";
import AwardListItem from "../components/AwardListItem";
import CategoryListItem from "../components/CategoryListItem";
import CategoryEditionNominationList from "../components/CategoryEditionNominationList";
import MovieListItem from "../components/MovieListItem";
import NominatedPerson from "../components/NominatedPerson";

export default {
  name: "CategoryView",
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
    CategoryEditionNominationList
  },
  props: {
    categoryName: {
      type: String,
      required: true
    },
    nameShort: {
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
      categoryId: undefined
    };
  },
  methods: {
    getWinner(nominations) {
      return nominations.find(nomination => nomination.winner);
    },
    groupByMovie(nominations) {
      return Object.values(groupBy(nominations, "movie.id"));
    }
  },
  apollo: {
    category: {
      query: gql`
        query category(
          $id: Int!
          $awardId: Int!
          $nCondition: NominationCondition
        ) {
          category(id: $id, awardId: $awardId) {
            ...category
            editionCategories(
              condition: { complete: true }
              orderBy: EDITION_BY_EDITION_ID__DATE_DESC
            ) {
              nodes {
                edition {
                  id
                  date
                  name
                  publish
                  nominations(condition: $nCondition) {
                    totalCount
                    nodes {
                      id
                      winner
                      movie {
                        ...movie
                      }
                      nominatedPeople {
                        nodes {
                          ...nominatedPerson
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
          }
        }
        ${MovieListItem.fragments.movie}
        ${NominatedPerson.fragments.nominatedPerson}
        ${CategoryListItem.fragments.category}
      `,
      variables() {
        return {
          id: this.categoryId,
          awardId: this.award.id,
          nCondition: { categoryId: this.categoryId }
        };
      },
      skip: true
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
        const { id } = this.award.categories.nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = id;
        this.$apollo.queries.category.skip = false;
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
