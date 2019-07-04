/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue";
/* eslint-disable-next-line */
import { configure, addDecorator } from "@storybook/vue";
import apolloStorybookDecorator from "./ApolloStorybookDecorator.js";
//import typeDefs from "../schema/typeDefinitions";
import mocks from "./schema/mocks";
import typeDefs from "./schema/typeDefs";

import "../../src/assets/tailwind.css";
import FontAwesomeIcon from "../../src/plugins/FontAwesomeIcon";

Vue.component("font-awesome-icon", FontAwesomeIcon);

addDecorator(apolloStorybookDecorator({ typeDefs, mocks, Vue }));

const req = require.context("../../src/components", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
