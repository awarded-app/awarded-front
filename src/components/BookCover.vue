<template functional>
  <img
    class="shadow flex-none"
    :class="[data.class, data.staticClass]"
    v-bind="data.attrs"
    :src="props.url"
    v-on="listeners"
  />
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  }
};
</script>
