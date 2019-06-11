import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import Awards from "./Awards.vue";
Vue.component("awards", Awards);

const awards = {
  totalCount: 5,
  nodes: [
    {
      id: 2,
      nameShort: "Berlinale",
      nameLong: "Berlin International Film Festival",
      logo: "berlinale.png"
    },
    {
      id: 3,
      nameShort: "Venice Film Festival",
      nameLong: "Venice International Film Festival",
      logo: "venice.png"
    },
    {
      id: 5,
      nameShort: "Oscars",
      nameLong: "Academy Awards",
      logo: "oscars.png"
    },
    {
      id: 6,
      nameShort: "Cannes",
      nameLong: "Cannes FIlm Festival",
      logo: "cannes.png"
    },
    {
      id: 7,
      nameShort: "Golden Globes",
      nameLong: "Golden Globe Awards",
      logo: "golden-globe.png"
    }
  ]
};

storiesOf("Awards", module).add("Simple component", () => ({
  data: () => ({
    awards
  }),
  template: "<awards />"
}));
