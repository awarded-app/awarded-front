<template>
  <layout :name="`${AwardType}Layout`">
    <div>
      <breadcrumbs :prev-screen-params="{ nameShort }" :award-type="awardType">{{
        editionYear
      }}</breadcrumbs>
      <article>
        <header class="flex sm:items-center mb-2">
          <h2 class="flex items-center flex-wrap leading-tight">
            <span class="mr-2 font-mono">{{ editionYear }}</span>
            <span class="text-faded">{{
              edition.name.includes(editionYear) ? nameShort : edition.name
            }}</span>
          </h2>
        </header>
        <spinner v-if="$apollo.loading" />
        <section v-else>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p class="text-faded">
              {{ edition.date | formatDate("MMMM do") }}
            </p>
          </div>
          <section class="pt-4">
            <h4 class="text-faded mb-2 a-uppercase-info">
              <span v-if="award.isFestival">Main Sections</span>
              <span v-else>All Categories</span>
            </h4>
            <list-transition>
              <component
                :is="`${AwardType}Category`"
                v-for="(category, index) in completeCategories.nodes"
                :key="category.id"
                :data-index="index"
                :category="category"
                :is-festival="award.isFestival"
                :is-future-edition="isFutureEdition"
                :edition-date="edition.date"
                class="mb-8"
              />
            </list-transition>
          </section>
        </section>
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
import isAfter from "date-fns/isAfter";

import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner.vue";
import NominationListItem from "@/components/NominationListItem";
import MoviesCategory from "@/components/MoviesCategory";
import BooksCategory from "@/components/BooksCategory";
import ListTransition from "@/components/ListTransition";

export default {
  name: "EditionView",
  metaInfo() {
    const editionName = this.edition.name;
    return {
      title: `${this.editionYear} ${this.nameShort} - Winners and nominees in all categories`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.nameShort} ${
            this.editionYear
          } (${editionName}): winners and nominees in all categories`
        }
      ]
    };
  },
  components: {
    BooksCategory,
    MoviesCategory,
    Spinner,
    Layout,
    ListTransition
  },
  props: {
    nameShort: {
      type: String,
      required: true
    },
    editionYear: {
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
      award: {
        nameShort: this.nameShort,
        nameLong: "",
        country: {
          code: ""
        }
      },
      edition: {
        name: "",
        date: ""
      },
      categories: { nodes: [] },
      AwardType: this.$options.filters.capitalize(this.awardType),
      skipEditionQuery: true,
      skipCategoriesQuery: true,
      isFutureEdition: false
    };
  },
  apollo: {
    categories: {
      query() {
        const nominationFragment = NominationListItem.fragments[`${this.awardType}Nomination`];
        return gql`
          query ${this.awardType}Categories(
            $categoryCondition: ${this.AwardType}CategoryCondition
            $nominationCondition: ${this.AwardType}NominationCondition
            $editionCategoryCondition: ${this.AwardType}EditionCategoryCondition
          ) {
            ${this.awardType}Categories(condition: $categoryCondition, orderBy: [ORDER_ASC]) {
              totalCount
              nodes {
                id
                name
                display
                order
                award {
                  id
                  nameShort
                }
                ${this.awardType}Prizes {
                  nodes {
                    id
                    name
                    order
                    display
                  }
                }
                ${this.awardType}EditionCategories(condition: $editionCategoryCondition) {
                  totalCount
                  nodes {
                    id
                    categoryId
                    complete
                  }
                }
                ${
                  this.awardType
                }Nominations(condition: $nominationCondition, orderBy: IS_WINNER_DESC) {
                  totalCount
                  nodes {
                    ...${this.awardType}Nomination
                  }
                }
              }
            }
          }
          ${nominationFragment}
        `;
      },
      variables() {
        return {
          categoryCondition: {
            awardId: this.award.id
          },
          nominationCondition: {
            editionId: this.edition.id
          },
          editionCategoryCondition: {
            editionId: this.edition.id
          }
        };
      },
      /* result({ data }) {
        console.log("> CATEGORIES fetched");
        console.dir(data[`${this.awardType}Categories`]);
      }, */
      update(data) {
        // filter only complete
        return (this.categories = data[`${this.awardType}Categories`]);
      },
      skip: true
    },
    editionByYear: {
      query() {
        return gql`
          query ${this.awardType}EditionByYear(
            $filter: ${this.AwardType}EditionFilter, $year: Int) {
              ${this.awardType}EditionByYear(filter: $filter, year: $year) {
                nodes {
                  id
                  name
                  date
                }
              }
          }
        `;
      },
      variables() {
        return {
          filter: {
            awardId: {
              equalTo: this.award.id
            }
          },
          year: Number(this.editionYear)
        };
      },
      /* result({ data }) {
        console.log("> EDITION fetched");
        console.dir(data[`${this.awardType}EditionByYear`].nodes[0]);
      }, */
      update(data) {
        this.$apollo.queries.categories.skip = false;
        this.isFutureEdition = isAfter(new Date(this.edition.date), new Date());
        return (this.edition = data[`${this.awardType}EditionByYear`].nodes[0]);
      },
      skip: true
    },
    awardByNameShort: {
      query() {
        return gql`
          query ${this.awardType}AwardByNameShort($nameShort: String!) {
            ${this.awardType}AwardByNameShort(nameShort: $nameShort) {
              id
              nameLong
              nameShort
              isFestival
            }
          }
        `;
      },
      variables() {
        return {
          nameShort: this.nameShort
        };
      },
      /* result({ data }) {
        console.log("> AWARD fetched");
        console.dir(data[`${this.awardType}AwardByNameShort`]);
      }, */
      update(data) {
        this.award = data[`${this.awardType}AwardByNameShort`];
        this.$apollo.queries.editionByYear.skip = false;
      }
    }
  },
  computed: {
    completeCategories() {
      if (this.categories.nodes.length === 0) return [];
      const completeCategories = { ...this.categories };
      completeCategories.nodes = this.categories.nodes.filter(category => {
        if (category[`${this.awardType}EditionCategories`].totalCount > 0) {
          return category[`${this.awardType}EditionCategories`].nodes[0].complete;
        }
        return false;
      });

      return completeCategories;
    }
  }
};
</script>

<style lang="scss" scoped></style>
