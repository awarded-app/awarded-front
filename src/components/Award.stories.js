import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import Award from "./Award.vue";
Vue.component("award", Award);

const award = {
  id: 2,
  nameLong: "Berlin International Film Festival",
  nameShort: "Berlinale",
  logo: "berlinale.png"
};

storiesOf("Award", module).add("Simple component", () => ({
  data: () => ({
    award
  }),
  template: '<award :award="award"/>'
}));
