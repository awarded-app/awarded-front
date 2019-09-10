<template>
  <ul class="flex flex-wrap">
    <li v-for="({ author }, index) in authors" :key="author.id">
      <span>
        <person-link :person-id="author.id" :person-name="author.name" award-type="books">{{
          author.name
        }}</person-link
        ><span v-if="index < authors.length - 1" class="font-normal">, </span>
      </span>
    </li>
  </ul>
</template>

<script>
import PersonLink from "./PersonLink";

export default {
  name: "BookAuthors",
  components: {
    PersonLink
  },
  props: {
    authors: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
