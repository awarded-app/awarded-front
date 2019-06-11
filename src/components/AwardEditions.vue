<template>
  <apollo-query
    :query="
      gql => gql`
        query editions($condition: EditionCondition) {
          editions(condition: $condition) {
            totalCount
            nodes {
              date
              name
              id
              poster
              award {
                nameLong
                nameShort
                logo
                id
              }
            }
          }
        }
      `
    "
    :variables="{
      condition: {
        awardId
      }
    }"
    :skip="awardId === null"
  >
    <template v-slot="{ result: { data, error }, isLoading }">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="data" class="pl-8">
        <p v-if="data.editions.totalCount === 0">No editions!</p>
        <award-edition
          v-for="edition in data.editions.nodes"
          :key="edition.id"
          :edition="edition"
        />
      </div>
      <div v-else>Error...</div>
    </template>
  </apollo-query>
</template>

<script>
import AwardEdition from "@/components/AwardEdition";
export default {
  name: "AwardEditions",
  components: { AwardEdition },
  props: {
    awardId: {
      type: Number,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped></style>
