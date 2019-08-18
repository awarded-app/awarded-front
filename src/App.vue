<template>
  <div id="app" class="min-h-full flex flex-col items-stretch antialiased">
    <nav
      class="mb-4 flex flex-shrink-0 justify-between items-center flex-wrap"
      :class="$route.name.includes('home') ? 'indented' : ''"
    >
      <router-link to="/">
        <h1 class="font-bold text-4xl flex flex-col md:flex-row leading-tight mb-2">
          <span class="mr-2 -mb-2 md:mb-0">AWARDED</span>
          <section-name :path="$route.path" />
        </h1>
      </router-link>
      <ul class="text-gray-500 a-uppercase-info hidden sm:flex">
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
      <router-view />
    </main>
    <base-footer :class="$route.name === 'homeMovies' ? 'indented' : ''" />
  </div>
</template>

<script>
import BaseFooter from "@/components/BaseFooter";
import SectionName from "@/components/SectionName";

export default {
  name: "Home",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s - Awarded",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Keep track of the most important award and movie festivals. Find the next movie to watch."
      }
    ]
  },
  components: {
    BaseFooter,
    SectionName
  }
};
</script>

<style></style>
