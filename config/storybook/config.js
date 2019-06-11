/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue";
import { configure } from "@storybook/vue";
import "../../src/assets/tailwind.css";
import FontAwesomeIcon from "../../src/plugins/FontAwesomeIcon";
import { createProvider } from "../../src/vue-apollo";

Vue.component("font-awesome-icon", FontAwesomeIcon);

const req = require.context("../../src/components", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
