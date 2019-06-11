<template functional>
  <div>
    <div
      v-for="nominatedPerson in props.nomination.nominatedPeople.nodes"
      :key="nominatedPerson.id"
    >
      <h3 v-if="nominatedPerson.prize" class="text-gray-500">
        {{ nominatedPerson.prize.name }}
        <span class="text-gray-500 ml-2"
          >({{ nominatedPerson.person.name }})</span
        >
      </h3>
    </div>
    <!-- {{ nomination.category.name }} -->
  </div>
</template>
