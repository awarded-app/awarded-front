import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import StoryRouter from "storybook-vue-router";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import MovieItem from "./MovieItem.vue";
Vue.component("movie-item", MovieItem);

const movie = {
  id: 965,
  title: "Green Book",
  tmdbId: 490132
};
const nominationsByMovie = [
  {
    id: 1781,
    movie: {
      id: 965,
      title: "Green Book"
    },
    nominatedPeople: {
      totalCount: 2,
      nodes: [
        {
          character: null,
          id: 3171,
          job: { id: 6, name: "Producer", __typename: "Job" },
          person: {
            id: 1185,
            name: "Jim Burke"
          },
          prize: {
            id: 18,
            name: "Best Picture",
            order: 1,
            display: "movie"
          }
        },
        {
          character: null,
          id: 3172,
          job: { id: 6, name: "Producer", __typename: "Job" },
          person: {
            id: 1805,
            name: "Charles B. Wessler"
          },
          prize: {
            id: 18,
            name: "Best Picture",
            order: 1,
            display: "movie"
          }
        }
      ]
    },
    category: {
      id: 4,
      important: true,
      name: "Best Picture",
      display: "movie",
      order: 0,
      prizes: {
        nodes: [{ id: 18, name: "Best Picture", order: 1, display: "movie", __typename: "Prize" }]
      },
      award: { nameShort: "Oscars", __typename: "Award" }
    },
    winner: true
  },
  {
    id: 1794,
    movie: {
      id: 965,
      title: "Green Book"
    },
    nominatedPeople: {
      totalCount: 1,
      nodes: [
        {
          character: "Don Shirley",
          id: 3201,
          job: null,
          person: {
            id: 378,
            name: "Mahershala Ali"
          },
          prize: {
            id: 20,
            name: "Best Actor in a Supporting Role",
            order: 1,
            display: "person"
          }
        }
      ]
    },
    category: {
      id: 6,
      important: true,
      name: "Actor in a Supporting Role",
      display: "person",
      order: 2,
      prizes: {
        nodes: [
          {
            id: 20,
            name: "Best Actor in a Supporting Role",
            order: 1,
            display: "person"
          }
        ]
      },
      award: { nameShort: "Oscars", __typename: "Award" }
    },
    winner: true
  },
  {
    id: 1899,
    movie: {
      id: 965,
      title: "Green Book"
    },
    nominatedPeople: {
      totalCount: 2,
      nodes: [
        {
          character: null,
          id: 3359,
          job: { id: 14, name: "Writer", __typename: "Job" },
          person: {
            id: 1808,
            name: "Nick Vallelonga"
          },
          prize: {
            id: 40,
            name: "Best Original Screenplay",
            order: 1,
            display: "movie"
          }
        },
        {
          character: null,
          id: 3360,
          job: { id: 14, name: "Writer", __typename: "Job" },
          person: {
            id: 1806,
            name: "Brian Hayes Currie"
          },
          prize: {
            id: 40,
            name: "Best Original Screenplay",
            order: 1,
            display: "movie"
          }
        }
      ]
    },
    category: {
      id: 26,
      important: null,
      name: "Writing (Original Screenplay)",
      display: "movie",
      order: 23,
      prizes: {
        nodes: [
          {
            id: 40,
            name: "Best Original Screenplay",
            order: 1,
            display: "movie"
          }
        ]
      },
      award: { nameShort: "Oscars", __typename: "Award" }
    },
    winner: true
  }
];

const singleNomination = [
  {
    id: 1781,
    nominatedPeople: {
      totalCount: 2,
      nodes: [
        {
          character: null,
          id: 3171,
          job: { id: 6, name: "Producer", __typename: "Job" },
          person: {
            id: 1185,
            name: "Jim Burke"
          },
          prize: {
            id: 18,
            name: "Best Picture",
            order: 1,
            display: "movie"
          }
        },
        {
          character: null,
          id: 3172,
          job: { id: 6, name: "Producer", __typename: "Job" },
          person: {
            id: 1805,
            name: "Charles B. Wessler"
          },
          prize: {
            id: 18,
            name: "Best Picture",
            order: 1,
            display: "movie"
          }
        }
      ]
    },
    winner: true
  }
];

const stories = storiesOf("MovieItem", module);
stories.addDecorator(withKnobs);
stories.addDecorator(StoryRouter());

stories
  .add("Simple component", () => ({
    data() {
      return {
        movie
      };
    },
    template: "<movie-item  :movie='movie'/>"
  }))
  .add("Award Movie with poster and all nominations", () => ({
    props: {
      showPoster: {
        default: boolean("Show Poster?", true)
      }
    },
    data() {
      return {
        nominations: nominationsByMovie,
        movie,
        isFull: true
      };
    },
    template:
      "<movie-item :nominations='nominations' :movie='movie':show-poster='showPoster':is-full='isFull'/>"
  }))
  .add("Award Movie single category no poster", () => ({
    data() {
      return {
        nominations: singleNomination,
        movie,
        isCategory: true
      };
    },
    template: "<movie-item :nominations='nominations' :movie='movie' :is-category='isCategory'/>"
  }));
