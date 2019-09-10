<template functional>
  <router-link
    :to="`/${props.awardType}/person/${props.personId}/${props.personName}`"
    tag="a"
    class="title-link"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    ><slot>{{ props.personName }}</slot></router-link
  >
</template>
<script>
export default {
  props: {
    personId: {
      type: Number,
      required: true
    },
    personName: {
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
