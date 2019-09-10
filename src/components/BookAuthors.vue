<template functional>
  <ul
    class="flex flex-wrap"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <li v-for="({ author }, index) in props.authors" :key="author.id">
      {{ author.name }}<span v-if="index < props.authors.length - 1" class="font-normal">, </span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "BookAuthors",
  props: {
    authors: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped></style>
