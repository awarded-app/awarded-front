<template>
  <div class="min-h-full flex flex-col items-stretch antialiased">
    <base-nav award-type="movies" />
    <main class="flex-1 flex-shrink-0 mb-8">
      <slot />
    </main>
    <base-footer :class="$route.name.includes('home') ? 'indented' : ''" />
  </div>
</template>
<script>
import BaseFooter from "@/components/BaseFooter";
import BaseNav from "@/components/BaseNav";

export default {
  name: "MoviesLayout",
  metaInfo: {
    title: "Awarded Movies",
    titleTemplate: "%s - Awarded Movies",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Keep track of award winning movies. Find the next movie to watch."
      }
    ]
  },
  components: {
    BaseNav,
    BaseFooter
  }
};
</script>

<style>
body,
html {
  /* @apply bg-gray-900 text-white; */
  color: var(--moviesTextColor);
  background-color: var(--moviesBgColor);
}

a.link-external::after {
  /* @apply text-gray-500; */
  color: var(--moviesFadedColor);
}

.text-faded {
  /* @apply text-gray-500; */
  color: var(--moviesFadedColor);
}
.text-main {
  color: var(--moviesTextColor);
}

a.title-link,
a.title-link:visited {
  background-image: linear-gradient(
      transparent 2px,
      var(--moviesAccentColor) 2px,
      var(--moviesAccentColor) 4px,
      transparent 4px
    ),
    linear-gradient(
      transparent 2px,
      var(--moviesExtraFadedColor) 2px,
      var(--moviesExtraFadedColor) 4px,
      transparent 4px
    );
}

@supports (-ms-ime-align: auto) {
  a.title-link,
  a.title-link:visited {
    background-size: 0% 2px, 100% 2px;
    padding-bottom: 2px;
  }
  a.title-link:hover {
    background-size: 100% 2px;
  }
}
</style>
