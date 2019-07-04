<template functional>
  <router-link
    :to="`/movie/${props.movieId}/${props.movieTitle}`"
    tag="a"
    class="title-link"
    >{{ props.movieTitle }}</router-link
  >
</template>
