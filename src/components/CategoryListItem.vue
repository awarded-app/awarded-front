<template>
  <div></div>
</template>

<script>
import gql from "graphql-tag";
export default {
  fragments: {
    category: gql`
      fragment category on Category {
        nodeId
        id
        important
        name
        description
        display
        order
        prizes {
          nodes {
            id
            name
            order
            display
          }
        }
        award {
          nameShort
        }
      }
    `
  }
};
</script>

<style lang="scss" scoped></style>
