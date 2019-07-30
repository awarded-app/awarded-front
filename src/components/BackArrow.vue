<template functional>
  <nav class="h-full w-6 inline-block cursor-pointer hover:text-yellow-500">
    <router-link
      :to="props.to"
      tag="a"
      :class="[data.class, data.staticClass]"
      :style="[data.style, data.staticStyle]"
      v-bind="data.attrs"
      v-on="listeners"
      >&larr;</router-link
    >
  </nav>
</template>
