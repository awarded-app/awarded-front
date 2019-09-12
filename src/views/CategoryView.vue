<template>
  <layout :name="`${AwardType}Layout`">
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
        <component :is="`${AwardType}CategoryNominations`" v-else :category-id="categoryId" />
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner";
import MoviesCategoryNominations from "@/components/MoviesCategoryNominations";
import BooksCategoryNominations from "@/components/BooksCategoryNominations";

import ListTransition from "@/components/ListTransition";

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
          }`
        }
      ]
    };
  },
  components: {
    Spinner,
    BooksCategoryNominations,
    MoviesCategoryNominations,
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
      categoryId: null,
      AwardType: this.$options.filters.capitalize(this.awardType)
    };
  },

  apollo: {
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
        const award = data[`${this.awardType}AwardByNameShort`];
        const { id } = award[`${this.awardType}Categories`].nodes.find(
          category => category.name === this.categoryName
        );
        this.categoryId = id;
        return award;
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
