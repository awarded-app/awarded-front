<template>
  <div class="min-h-full flex flex-col items-stretch antialiased px-4">
    <nav class="mb-12 flex flex-col items-center">
      <ul class="text-faded a-uppercase-info flex mb-4">
        <!-- <li class="mr-4">Articles</li> -->
        <li class="mr-4 mb-2">
          <a href="/movies" class="title-link home-link font-bold">MOVIES</a>
        </li>
        <li class="mr-4 mb-2">
          <a href="/books" class="title-link home-link font-bold">BOOKS</a>
        </li>
        <li class="mr-4 mb-2">
          <a href="https://news.awarded.to/" class="title-link home-link">News</a>
        </li>
        <li class="mr-4 mb-2">
          <router-link to="/about" class="title-link home-link">About</router-link>
        </li>
        <li>
          <a
            href="http://eepurl.com/dnFggL"
            target="_blank"
            rel="noopener"
            class="link-external  title-link home-link"
            >Subscribe</a
          >
        </li>
      </ul>
      <router-link to="/">
        <h1 class="font-bold text-6xl flex flex-col md:flex-row leading-tight">
          AWARDED
        </h1>
      </router-link>
      <p class="text-lg font-semibold text-center">
        Discover your next award winning book or movie.
      </p>
    </nav>
    <main class="flex-1 flex-shrink-0 mb-8">
      <slot />
    </main>
    <base-footer class="text-center" />
  </div>
</template>
<script>
import BaseFooter from "@/components/BaseFooter";

export default {
  name: "HomeLayout",
  metaInfo: {
    title: "Awarded",
    titleTemplate: "%s",
    meta: [
      {
        vmid: "description",
        name: "description",
        content:
          "Keep track of award winning books and movies from the most important awards and festivals"
      }
    ]
  },
  components: {
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

a.movies-link,
a.movies-link:visited {
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
a.books-link,
a.books-link:visited {
  background-image: linear-gradient(
      transparent 2px,
      var(--booksAccentColor) 2px,
      var(--booksAccentColor) 4px,
      transparent 4px
    ),
    linear-gradient(
      transparent 2px,
      var(--booksExtraFadedColor) 2px,
      var(--booksExtraFadedColor) 4px,
      transparent 4px
    );
}

@supports (-ms-ime-align: auto) {
  a.link,
  a.home-link,
  a.books-link,
  a.movies-link,
  a.home-link:visited,
  a.books-link:visited,
  a.movies-link:visited,
  a.link:visited {
    background-size: 0% 2px, 100% 2px;
    padding-bottom: 2px;
  }
  a.link:hover,
  a.home-link:hover,
  a.books-link:hover,
  a.movies-link:hover {
    background-size: 100% 2px;
  }
}
</style>
