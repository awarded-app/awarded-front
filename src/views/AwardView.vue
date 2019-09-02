<template>
  <layout name="MoviesLayout">
    <div>
      <breadcrumbs>{{ nameShort }}</breadcrumbs>
      <article>
        <header class="flex mb-2">
          <h2 class="flex items-center flex-wrap leading-none">
            <span class="mr-2 ">{{ nameShort }}</span>
            <span class="text-gray-500 ">
              {{ award.nameLong }}
              <sup class="text-sm">{{ award.country.code }}</sup>
            </span>
          </h2>
        </header>
        <section>
          <template v-if="$apollo.loading">
            <spinner />
          </template>
          <template v-else>
            <p class="text-gray-500 mb-4 md:w-2/3 lg:w-1/2">
              {{ award.description }}
            </p>
            <p class="text-gray-500 mb-4">
              <a
                :href="award.link"
                class="link-external hover:text-white"
                target="_blank"
                rel="noopener"
                >{{ award.link | formatUrl }}</a
              >
            </p>
            <section>
              <edition-list :award-id="award.id" :award-type="awardType" />
            </section>
          </template>
        </section>
      </article>
    </div>
  </layout>
</template>

<script>
import gql from "graphql-tag";
import Layout from "@/layouts/Layout";
import Spinner from "@/components/Spinner.vue";
import EditionList from "../components/EditionList";

export default {
  name: "AwardView",
  metaInfo() {
    const nameShort = this.nameShort;
    return {
      title: `${this.nameShort} - All Editions`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `Explore all past editions of the ${nameShort}.`
        }
      ]
    };
  },
  components: { EditionList, Spinner, Layout },
  props: {
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
      award: {
        nameShort: this.nameShort,
        nameLong: "",
        country: {
          code: ""
        }
      },
      editionYears: null
    };
  },
  apollo: {
    awardByNameShort: {
      query() {
        return gql`
          query ${this.awardType}AwardByNameShort($nameShort: String!) {
            ${this.awardType}AwardByNameShort(nameShort: $nameShort) {
              id
              link
              nameLong
              nameShort
              description
              country {
                id
                code
              }
              isFestival
              ${this.awardType}Editions(orderBy: DATE_DESC) {
                totalCount
                nodes {
                  id
                  date
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
      update(data) {
        this.award = data[`${this.awardType}AwardByNameShort`];
        this.editionYears = this.getEditionYears(this.award[`${this.awardType}Editions`].nodes);
        return this.award;
      }
    }
  },
  methods: {
    getEditionYears(editions) {
      const dates = editions.map(edition => new Date(edition.date));
      return {
        minDate: new Date(Math.min.apply(null, dates)),
        maxDate: new Date(Math.max.apply(null, dates))
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
