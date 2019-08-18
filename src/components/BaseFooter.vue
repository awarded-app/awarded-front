<template functional>
  <footer
    class="bottom-0 text-xs mb-4 w-auto text-faded-color"
    :class="[data.class, data.staticClass]"
    :style="[data.style, data.staticStyle]"
    v-bind="data.attrs"
    v-on="listeners"
  >
    <p class="pt-8 mb-2 border-t border-gray-800">
      Made with &#9829; by
      <a
        href="https://twitter.com/danrocc"
        target="_blank"
        rel="noopener"
        class="title-link link-external"
        >Daniel</a
      >
      in Berlin.
    </p>
    <ul>
      <li>
        <router-link to="/about" class="title-link text-main-color">Learn more</router-link>
      </li>
      <li>
        <a
          href="http://eepurl.com/dnFggL"
          target="_blank"
          rel="noopener"
          class="link-external title-link  text-main-color"
          >Subscribe to updates</a
        >
      </li>
    </ul>
  </footer>
</template>

<style lang="scss" scoped></style>
