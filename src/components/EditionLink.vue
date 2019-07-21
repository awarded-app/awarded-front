<template>
  <router-link
    :to="`/award/${awardNameShort}/${$options.filters.year(editionDate)}`"
    tag="a"
    class="title-link"
    ><slot>{{ editionDate | year }}</slot></router-link
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
    }
  }
};
</script>
