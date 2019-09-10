<template functional>
  <router-link
    :to="`/books/${encodeURIComponent(props.bookTitle)}/${props.bookId}`"
    tag="a"
    class="title-link"
    :title="bookTitle"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    ><slot>{{ props.bookTitle }}</slot></router-link
  >
</template>
<script>
export default {
  props: {
    bookId: {
      type: Number,
      required: true
    },
    bookTitle: {
      type: String,
      required: true
    }
  }
};
</script>
