<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs :prev-screen-params="{ nameShort }">{{ categoryName }}</breadcrumbs>
      <article>
        <header class="flex sm:items-center">
          <h2 class="flex items-center flex-wrap">
            <span class="mr-2">{{ categoryName }}</span>
            <span class="text-faded leading-none mt-0">{{ nameShort }}</span>
          </h2>
        </header>
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
                v-for="({ edition }, index) in category[`${awardType}EditionCategories`].nodes"
                :key="edition.id"
                :data-index="index"
                class="mb-8"
              >
                <category-edition-nomination-list
                  :edition="edition"
                  :name-short="nameShort"
                  :is-festival="award.isFestival"
                  :display="category.display"
                  :award-type="awardType"
                />
              </li>
            </list-transition>
          </ul>
        </section>
      </article>
    </div>
  </layout>
</template>

<script>
const groupBy = require("lodash.groupby");
import gql from "graphql-tag";
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner.vue";
import CategoryEditionNominationList from "../components/CategoryEditionNominationList";
import MovieListItem from "../components/MovieListItem";
import NominatedPerson from "../components/NominatedPerson";
import ListTransition from "../components/ListTransition";

export default {
  name: "CategoryView",
  metaInfo() {
    return {
      title: `${this.categoryName} - ${this.nameShort} - Winner and nominees`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.categoryName} winners and nominees in all editions of the ${
            this.nameShort
          }.`
        }
      ]
    };
  },
  components: {
    Spinner,
    CategoryEditionNominationList,
    Layout,
    ListTransition
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
      AwardType: this.$options.filters.capitalize(this.awardType),
      AWARDTYPE: this.awardType.toUpperCase()
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
      query() {
        const fragmentNominatedPerson =
          NominatedPerson.fragments[`${this.awardType}NominatedPerson`];
        return gql`
          query ${this.awardType}Category($id: Int!, $nCondition: ${
          this.AwardType
        }NominationCondition) {
            ${this.awardType}Category(id: $id) {
              id
              description
              display
              ${this.awardType}EditionCategories(
                condition: { complete: true }
                orderBy: ${this.AWARDTYPE}_EDITION_BY_EDITION_ID__DATE_DESC
              ) {
                nodes {
                  edition {
                    id
                    date
                    name
                    publish
                    ${this.awardType}Nominations(condition: $nCondition) {
                      totalCount
                      nodes {
                        id
                        isWinner
                        movie {
                          ...movie
                        }
                        ${this.awardType}NominatedPeople {
                          nodes {
                            ...${this.awardType}NominatedPerson
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
          ${fragmentNominatedPerson}
        `;
      },
      variables() {
        return {
          id: this.categoryId,
          nCondition: { categoryId: this.categoryId }
        };
      },
      update(data) {
        return (this.category = data[`${this.awardType}Category`]);
      },
      skip: true
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
      result({ data }) {
        console.log("> AWARD fetched");
        console.dir(data[`${this.awardType}AwardByNameShort`]);
      },
      update(data) {
        this.award = data[`${this.awardType}AwardByNameShort`];
        const { id } = this.award[`${this.awardType}Categories`].nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = id;
        this.$apollo.queries.category.skip = false;
        return this.award;
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
