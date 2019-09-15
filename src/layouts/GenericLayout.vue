<template>
  <div class="min-h-full flex flex-col items-stretch antialiased px-4">
    <base-nav />
    <main class="flex-1 flex-shrink-0 mb-8">
      <slot />
    </main>
    <base-footer />
  </div>
</template>
<script>
import BaseFooter from "@/components/BaseFooter";
import BaseNav from "@/components/BaseNav";

export default {
  name: "GenericLayout",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s - Awarded",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Keep track of the most important film and book awards and festivals"
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
  color: var(--homeTextColor);
  background-color: var(--homeBgColor);
}

a.link-external::after {
  color: var(--homeFadedColor);
}

.text-faded {
  color: var(--homeFadedColor);
}
.text-main {
  color: var(--homeTextColor);
}

a.home-link,
a.home-link:visited {
  background-image: linear-gradient(
      transparent 2px,
      var(--homeAccentColor) 2px,
      var(--homeAccentColor) 4px,
      transparent 4px
    ),
    linear-gradient(
      transparent 2px,
      var(--homeExtraFadedColor) 2px,
      var(--homeExtraFadedColor) 4px,
      transparent 4px
    );
}

@supports (-ms-ime-align: auto) {
  a.link,
  a.home-link,
  a.home-link:visited,
  a.link:visited {
    background-size: 0% 2px, 100% 2px;
    padding-bottom: 2px;
  }
  a.link:hover,
  a.home-link:hover {
    background-size: 100% 2px;
  }
}
</style>
