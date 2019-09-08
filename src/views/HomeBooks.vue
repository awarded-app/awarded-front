<template>
  <layout name="BooksLayout">
    <div>
      <p
        class="-mt-4 mb-4 pb-4 text-faded font-semibold border-b border-gray-300"
        :class="$route.name === 'homeBooks' ? 'indented' : ''"
      >
        Keep track of the most important book awards and festivals. Find the next book to read.
      </p>
      <award-list award-type="books" />
    </div>
  </layout>
</template>

<script>
import AwardList from "@/components/AwardList";
import Layout from "@/layouts/Layout";

export default {
  name: "HomeBooks",
  metaInfo: {
    title: `Awarded Books - Keep track of the most important book awards and festivals`,
    titleTemplate: ""
  },
  components: {
    Layout,
    AwardList
  }
};
</script>
