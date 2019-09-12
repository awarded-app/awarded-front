<template>
  <layout :name="`${AwardType}Layout`">
    <div>
      <breadcrumbs>{{ nameShort }}</breadcrumbs>
      <article>
        <header class="flex mb-2 flex-wrap">
          <h2 class="leading-none">
            <span class="mr-2 ">{{ nameShort }}</span>
            <span v-if="award.nameLong !== nameShort" class="text-faded">
              {{ award.nameLong }} </span
            ><sup class="text-sm text-faded">{{ award.country.code }}</sup>
          </h2>
        </header>
        <section>
          <template v-if="$apollo.loading">
            <spinner />
          </template>
          <template v-else>
            <p class="text-faded mb-4 lg:w-2/3 xl:w-1/2">
              {{ award.description }}
            </p>
            <p class="text-faded mb-4">
              <a
                :href="award.link"
                class="link-external hover:text-main"
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
          content: `${nameShort}: Explore all past editions`
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
      editionYears: null,
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
