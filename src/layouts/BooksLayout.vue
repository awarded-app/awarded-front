<template>
  <div class="min-h-full flex flex-col items-stretch antialiased">
    <nav
      class="mb-4 flex flex-shrink-0 justify-between items-center flex-wrap"
      :class="$route.name.includes('home') ? 'indented' : ''"
    >
      <router-link to="/">
        <h1
          class="font-bold text-4xl flex flex-col md:flex-row leading-tight mb-2"
        >
          <span class="mr-2 -mb-2 md:mb-0">AWARDED</span>
          <span class="text-faded-color uppercase">BOOKS</span>
        </h1>
      </router-link>
      <ul class="text-faded-color a-uppercase-info hidden sm:flex">
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
  name: "BooksLayout",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s - Awarded Books",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Keep track of the most important books awards. Find the next books to read."
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
  --mainColor: #c53030;
  --darkGray: #e2e8f0;
}

body,
html {
  @apply bg-gray-100 text-gray-800;
}

.text-faded {
  @apply text-gray-600;
}
.text-main {
  @apply text-gray-800;
}

a.link-external::after {
  @apply text-faded;
}

a.title-link,
a.title-link:visited {
  background-image: linear-gradient(
      transparent 2px,
      var(--mainColor) 2px,
      var(--mainColor) 4px,
      transparent 4px
    ),
    linear-gradient(
      transparent 2px,
      var(--darkGray) 2px,
      var(--darkGray) 4px,
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
