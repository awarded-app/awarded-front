<template>
  <layout name="MoviesLayout">
    <div>
      <p class="-mt-4 mb-8 text-gray-500" :class="$route.name === 'homeMovies' ? 'indented' : ''">
        Keep track of the most important movie awards and festivals.<br />
        Find the next movie to watch.
      </p>
      <award-list type="movies" />
    </div>
  </layout>
</template>

<script>
import Layout from "@/layouts/Layout";
import AwardList from "@/components/AwardList";

export default {
  name: "HomeMovies",
  metaInfo: {
    title: `Awarded - Keep track of the most important film awards and festivals`,
    titleTemplate: ""
  },
  components: {
    AwardList,
    Layout
  }
};
</script>
