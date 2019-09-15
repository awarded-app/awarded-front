<template>
  <component :is="layout">
    <page-transition name="fade-in-right">
      <router-view :layout.sync="layout" />
    </page-transition>
  </component>
</template>

<script>
import PageTransition from "@/components/PageTransition";
export default {
  name: "App",
  components: {
    PageTransition
  },
  data() {
    return {
      layout: "div"
    };
  }
};
</script>

<style>
/* https://tailwindcss.com/docs/customizing-colors/#default-color-palette */

:root {
  --homeBgColor: #2d3748; /* gray-800 */
  --homeAccentColor: #718096; /* gray-600 */
  --homeTextColor: #fff;
  --homeFadedColor: #a0aec0; /* gray-500 */
  --homeExtraFadedColor: #4a5568; /* gray-500 */

  --moviesAccentColor: #ecc94b; /* yellow-500 */
  --moviesBgColor: #1a202c; /* gray-900 */
  --moviesTextColor: #fff;
  --moviesFadedColor: #a0aec0; /* gray-500 */
  --moviesExtraFadedColor: #2d3748; /* gray-800 */

  --booksAccentColor: #c53030; /* red-700 */
  --booksBgColor: #f7fafc; /*gray-100*/
  --booksTextColor: #2d3748; /* gray-800 */
  --booksFadedColor: #718096; /* gray-600 */
  --booksExtraFadedColor: #e2e8f0; /* gray-300 */
}
</style>
