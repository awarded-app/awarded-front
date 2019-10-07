<template>
  <router-link
    :to="`/${awardType}/award/${awardNameShort}/${editionOfficialYear}`"
    tag="a"
    class="title-link"
    ><slot>{{ editionOfficialYear }}</slot></router-link
  >
</template>

<script>
export default {
  props: {
    awardNameShort: {
      type: String,
      required: true
    },
    awardType: {
      type: String,
      required: true
    },
    editionOfficialYear: {
      type: [String, Number],
      default: null
    }
  }
};
</script>
