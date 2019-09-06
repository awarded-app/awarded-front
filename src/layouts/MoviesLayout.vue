<template>
  <div class="min-h-full flex flex-col items-stretch antialiased">
    <nav
      class="mb-4 flex flex-shrink-0 justify-between items-center flex-wrap"
      :class="$route.name.includes('home') ? 'indented' : ''"
    >
      <router-link to="/movies">
        <h1 class="font-bold text-4xl flex flex-col md:flex-row leading-tight mb-2">
          <span class="mr-2 -mb-2 md:mb-0">AWARDED</span>
          <span class="text-faded uppercase">MOVIES</span>
        </h1>
      </router-link>
      <ul class="text-faded a-uppercase-info hidden sm:flex">
        <!-- <li class="mr-4">Articles</li> -->
        <li class="mr-4 mb-2">
          <router-link to="/about" class="title-link">Learn more</router-link>
        </li>
        <li>
          <a
            href="http://eepurl.com/dnFggL"
            target="_blank"
            rel="noopener"
            class="link-external title-link"
            >Subscribe</a
          >
        </li>
      </ul>
    </nav>
    <main class="flex-1 flex-shrink-0 mb-8">
      <slot />
    </main>
    <base-footer :class="$route.name === 'homeMovies' ? 'indented' : ''" />
  </div>
</template>
<script>
import BaseFooter from "@/components/BaseFooter";

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
    BaseFooter
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
  @apply text-faded;
}

.text-faded {
  @apply text-faded;
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
