<template functional>
  <span
    class="inline-block w-4 text-base mr-2"
    :class="[
      data.class,
      data.staticClass,
      props.winner ? 'text-yellow-500' : 'text-gray-800'
    ]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    >★</span
  >
</template>
<script>
export default {
  props: {
    winner: {
      type: Boolean,
      default: true
    }
  }
};
</script>
