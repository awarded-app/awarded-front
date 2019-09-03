<template functional>
  <router-link
    :to="`/${props.awardType}/award/${props.awardNameShort}`"
    tag="a"
    class="title-link"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    ><slot>{{ props.awardNameShort }}</slot></router-link
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
    }
  }
};
</script>
