<template>
  <layout :name="`${AwardType}Layout`">
    <div>
      <breadcrumbs
        :prev-screen-params="prevScreenParams"
        :award-type="awardType"
        >{{ personName }}</breadcrumbs
      >
      <div>
        <component
          :is="`${AwardType}Person`"
          :person-id="personId"
          :person-name="personName"
        />
      </div>
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import BooksPerson from "@/components/BooksPerson";
import MoviesPerson from "@/components/MoviesPerson";

export default {
  name: "PersonView",
  metaInfo() {
    return {
      title: `${this.personName} - Nominations and wins`,
      meta: [
        {
          vmid: "description",
          name: "description",
          content: `${this.personName}: nominations and wins in all Awards and Festivals.`
        }
      ]
    };
  },
  components: {
    MoviesPerson,
    BooksPerson,
    Layout
  },
  props: {
    personName: {
      type: String,
      required: true
    },
    personId: {
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
      AwardType: this.$options.filters.capitalize(this.awardType),
      prevScreen: "",
      prevScreenParams: null
    };
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
