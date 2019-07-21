<template>
  <div class="pb-4">
    <h3 class="flex items-center">
      <plus-sign :is-open="isOpen" @click="isOpen = !isOpen" />
      <category-link
        :award-name-short="category.award.nameShort"
        :category-name="category.name"
      />
    </h3>
    <div v-if="isOpen" class="pl-6 lg:pl-8">
      <nomination
        v-for="nomination in category.nominations.nodes"
        :key="nomination.id"
        :nomination="nomination"
        :display="category.display"
      />
      <category-posters :nominations="category.nominations.nodes" />
    </div>
  </div>
</template>

<script>
import Nomination from "../components/Nomination";
import CategoryPosters from "../components/CategoryPosters";
import CategoryLink from "../components/CategoryLink";
export default {
  name: "Category",
  components: { Nomination, CategoryLink, CategoryPosters },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isOpen: this.category.important
    };
  }
};
</script>

<style lang="scss" scoped></style>
