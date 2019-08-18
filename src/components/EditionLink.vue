<template>
  <router-link
    :to="`/movies/award/${awardNameShort}/${editionYear || $options.filters.year(editionDate)}`"
    tag="a"
    class="title-link"
    ><slot>{{ (editionYear || editionDate) | year }}</slot></router-link
  >
</template>
<script>
export default {
  props: {
    editionDate: {
      type: String,
      required: true
    },
    awardNameShort: {
      type: String,
      required: true
    },
    editionYear: {
      type: String,
      default: undefined
    }
  }
};
</script>
