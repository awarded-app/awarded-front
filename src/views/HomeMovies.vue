<template>
  <layout name="MoviesLayout">
    <div>
      <p
        class="-mt-4 mb-4 pb-4 text-faded font-semibold border-b border-gray-800"
        :class="$route.name === 'homeMovies' ? 'indented' : ''"
      >
        Keep track of the most important movie awards and festivals. Find the next movie to watch.
      </p>
      <award-list :award-type="awardType" />
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import AwardList from "@/components/AwardList";

export default {
  name: "HomeMovies",
  metaInfo: {
    title: `Awarded Movies - Keep track of the most important film awards and festivals`,
    titleTemplate: ""
  },
  components: {
    AwardList,
    Layout
  },
  data() {
    return {
      awardType: "movies"
    };
  }
};
</script>
