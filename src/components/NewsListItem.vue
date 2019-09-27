<template>
  <article>
    <p class="a-uppercase-info text-faded text-xs tracking wide mb-2">
      {{ post.date | formatDate("dd. MMMM") }}
    </p>
    <h4 class="leading-tight mb-2">
      <a :href="link" class="title-link home-link font-semibold">{{ post.title }}</a>
    </h4>
    <p class="text-faded text-sm mb-2">
      {{ post.excerpt }}&nbsp;
      <a :href="link" class="title-link home-link font-semibold">Read&rarr;</a>
    </p>
    <ul class="flex flex-wrap">
      <li
        v-for="(tag, index) in post.tags"
        :key="index"
        class="mr-2 a-uppercase-info text-faded text-xs tracking wide"
      >
        <a :href="`${urlBase}/tag/${tag}`" class="title-link home-link">#{{ tag }}</a>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  name: "NewsListItem",
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      urlBase: "https://news.awarded.to"
    };
  },
  computed: {
    link() {
      return `${this.urlBase}/${this.post.slug}`;
    }
  }
};
</script>

<style lang="scss" scoped></style>
