<template>
  <div id="app" class="min-h-full flex flex-col items-stretch antialiased">
    <header class="mb-4 indented flex-shrink-0">
      <router-link to="/">
        <h1 class="font-bold text-4xl flex flex-col md:flex-row">
          <span class="mr-2 -mb-2 md:mb-0">AWARDED</span>
          <span class="text-gray-500">MOVIES</span>
        </h1>
      </router-link>
    </header>
    <main class="flex-1 flex-shrink-0 mb-8">
      <router-view />
    </main>
    <base-footer />
  </div>
</template>

<script>
import BaseFooter from "@/components/BaseFooter.vue";

export default {
  name: "Home",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s ★ Awarded",
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
    BaseFooter
  }
};
</script>

<style></style>
