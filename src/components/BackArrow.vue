<template functional>
  <nav
    class="h-full w-4 sm:w-6 align-middle inline-block cursor-pointer hover:text-yellow-500"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <router-link :to="props.to" tag="a">&larr;</router-link>
  </nav>
</template>
