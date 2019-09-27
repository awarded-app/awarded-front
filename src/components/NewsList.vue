<template>
  <div class="home-news-grid">
    <news-list-item v-for="(post, index) in newsList" :key="index" :post="post" />
  </div>
</template>

<script>
import NewsListItem from "@/components/NewsListItem";
import news from "@/data/news.json";

export default {
  name: "NewsList",
  components: {
    NewsListItem
  },
  props: {
    limit: {
      type: Number,
      default: 3
    },
    tag: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      news
    };
  },
  computed: {
    newsList() {
      const newsList = [...this.news.posts].sort((a, b) => a.date - b.date).slice(0, this.limit);
      return newsList;
    }
  }
};
</script>

<style scoped>
.home-news-grid {
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  justify-content: center;
}
</style>
