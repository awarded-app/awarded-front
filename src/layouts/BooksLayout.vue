<template>
  <div class="min-h-full flex flex-col items-stretch antialiased">
    <base-nav award-type="books"/>
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
  name: "BooksLayout",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s - Awarded Books",
    meta: [
      {
        vmid: "description",
        name: "description",
        content: "Keep track of award winning books. Find the next book to read."
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
