<template functional>
  <router-link
    :to="`/${props.awardType}/award/${props.awardNameShort}/category/${props.categoryName}`"
    tag="a"
    class="title-link"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    ><slot>{{ props.categoryName }}</slot></router-link
  >
</template>
<script>
export default {
  props: {
    categoryName: {
      type: String,
      required: true
    },
    awardNameShort: {
      type: String,
      required: true
    },
    awardType: {
      type: String,
      required: true
    }
  }
};
</script>
