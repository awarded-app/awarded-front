<template functional>
  <div
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    class="ball-pulse my-2"
    v-on="listeners"
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<style scoped>
@import "../assets/loaders.min.css";
.ball-pulse > div {
  background-color: var(--mainColor);
}
.loader-small .loader-inner {
  transform: scale(0.5, 0.5);
}
</style>
