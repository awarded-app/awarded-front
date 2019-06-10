<template>
  <ul v-if="!editions">
    <li>Loading...</li>
  </ul>
  <ul v-else>
    <li v-if="editions.totalCount === 0">No editions!</li>
    <award-edition v-for="edition in editions.nodes" :key="edition.id" :edition="edition" />
  </ul>
</template>

<script>
import gql from 'graphql-tag'
import AwardEdition from '@/components/AwardEdition'
export default {
  name: 'AwardEditions',
  components: { AwardEdition },
  props: {
    awardId: {
      type: Number,
      default: null
    }
  },
  apollo: {
    editions: {
      query: gql`
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
      `,
      variables() {
        return {
          condition: {
            awardId: this.awardId
          }
        }
      },
      skip() {
        return this.awardId === null
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
