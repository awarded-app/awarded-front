import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import AwardListItem from "./AwardListItem.vue";
Vue.component("award", AwardListItem);

const award = {
  id: 2,
  nameLong: "Berlin International Film Festival",
  nameShort: "Berlinale",
  logo: "berlinale.png"
};

storiesOf("AwardListItem", module).add("Simple component", () => ({
  data: () => ({
    award
  }),
  template: '<award :award="award"/>'
}));
