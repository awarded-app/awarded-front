<template>
  <div class="min-h-full flex flex-col items-stretch antialiased">
    <base-nav award-type="movies"/>
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
        content:
          "Keep track of the most important movie awards and festivals. Find the next movie to watch."
      }
    ]
  },
  components: {
    BaseNav,
    BaseFooter,
  }
};
</script>

<style>
:root {
  --mainColor: #ecc94b;
  --darkGray: #2d3748;
}
body,
html {
  @apply bg-gray-900 text-white;
}

a.link-external::after {
  @apply text-gray-500;
}

.text-faded {
  @apply text-gray-500;
}
.text-main {
  @apply text-white;
}

a.title-link,
a.title-link:visited {
  background-image: linear-gradient(
      transparent 2px,
      var(--mainColor) 2px,
      var(--mainColor) 4px,
      transparent 4px
    ),
    linear-gradient(transparent 2px, var(--darkGray) 2px, var(--darkGray) 4px, transparent 4px);
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
