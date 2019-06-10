<template>
  <p>
    <span v-if="nomination.category.display === 'person'">
      <span v-for="nominatedPerson in nomination.nominatedPeople.nodes" :key="nominatedPerson.id">
        {{ nominatedPerson.person.name }}
        <span v-if="nominatedPerson.character">({{ nominatedPerson.character }})</span>&nbsp;
      </span>
      /
    </span>
    {{ nomination.movie.title }}
    <br />
    {{ nomination.category.name }}
  </p>
</template>

<script>
export default {
  name: 'AwardEditionNomination',
  props: {
    nomination: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
