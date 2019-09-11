<template>
  <layout name="GenericLayout">
    <div>
      <breadcrumbs :prev-screen-params="prevScreenParams">About</breadcrumbs>

      <article class="md:w-2/3 lg:w-1/3">
        <h2 class="mb-8">What is this?</h2>
        <section class="text-faded">
          <p>
            I started <span class="font-semibold">Awarded</span> as a present
            for my dear <span class="font-semibold">mom</span>. Every year we
            would sit together through movie sessions where we would watch all
            nominated movies for the <span class="font-semibold">Oscars</span>,
            or the winner movies of <span class="font-semibold">Cannes</span> or
            <span class="font-semibold">Berlinale</span> Festivals.
          </p>
          <p>
            She would keep track of all movies in a little
            <span class="font-semibold">list</span>, and tick one by one as we
            watched them. Sometimes we missed one or two, or the list would get
            lost among the house's papers and she would start it all over again.
          </p>
          <p>
            I then had the idea to do this for her. A place where she could find
            <span class="font-semibold"
              >all nominations, for all awards, for all years</span
            >. Easy, fast, always available. There was also the potential this
            could be useful for many people. So I got on building.
          </p>
          <h3>What's the vision?</h3>
          <p>
            What you see here is still a work in progress. The idea is to expand
            not only adding more awards and movies, but also
            <span class="font-semibold"
              >books, games, products, buildings, TV shows</span
            >; anything that was nominated or got a prize has the potential to
            come to Awarded.
          </p>
          <h3>How to get updates?</h3>
          <p>
            To get (very occasional) updates about new categories or when the
            latest nominations are online,
            <a
              href="http://eepurl.com/dnFggL"
              target="_blank"
              rel="noopener"
              class="link-external title-link  "
              >subscribe to my little newsletter</a
            >.
          </p>
          <p>
            And please, help spread the word!
          </p>
        </section>
      </article>
    </div>
  </layout>
</template>
<script>
import Layout from "@/layouts/Layout";
export default {
  metaInfo: {
    title: `About`,
  },
  components: {
    Layout
  },
  data() {
    return {
      prevScreenParams: null,
      prevScreen: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.prevScreen = from.fullPath || "/";
      vm.prevScreenParams = from.params || null;
    });
  }
};
</script>
<style scoped>
p {
  @apply mb-4;
}
h3 {
  @apply mt-8;
}
</style>
