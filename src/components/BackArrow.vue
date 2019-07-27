<template functional>
  <router-link :to="props.to" tag="a" class="text-base hover:text-yellow-500" :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
    >&larr;</router-link
  >
</template>
