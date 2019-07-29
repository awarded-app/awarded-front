/* eslint-disable import/no-extraneous-dependencies */
import Vue from "vue";
/* eslint-disable-next-line */
import { configure } from "@storybook/vue";
import { addParameters } from "@storybook/vue";

const newViewports = {
  xs: {
    name: "xs 320",
    styles: {
      width: "320px",
      height: "100%"
    }
  },
  sm: {
    name: "sm 640",
    styles: {
      width: "640px",
      height: "100%"
    }
  },
  md: {
    name: "md 768",
    styles: {
      width: "768px",
      height: "100%"
    }
  },
  lg: {
    name: "lg 1024",
    styles: {
      width: "1024px",
      height: "100%"
    }
  },
  xl: {
    name: "xl 1280",
    styles: {
      width: "1280px",
      height: "100%"
    }
  }
};

addParameters({ viewport: { viewports: newViewports } });

import "../../src/assets/tailwind.css";
import FontAwesomeIcon from "../../src/plugins/FontAwesomeIcon";

Vue.component("font-awesome-icon", FontAwesomeIcon);

const req = require.context("../../src/components", true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
