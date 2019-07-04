import { shallowMount, createLocalVue } from "@vue/test-utils";
import { customizer } from "./helper";
import AwardEditions from "../AwardEditions.vue";
import Spinner from "../Spinner.vue";
import { HollowDotsSpinner } from "epic-spinners";
import mergeWith from "lodash.mergewith";

// create an extended `Vue` constructor
const localVue = createLocalVue();
localVue.component("hollow-dots-spinner", HollowDotsSpinner);

function createWrapper(overrides) {
  const defaultMountingOptions = {
    propsData: {
      awardId: 0
    },
    mocks: {
      $apollo: {
        loading: false
      }
    },
    localVue
  };
  return shallowMount(
    AwardEditions,
    mergeWith(defaultMountingOptions, overrides, customizer)
  );
}
const editions = {
  totalCount: 3,
  nodes: [
    {
      date: "2017-02-26",
      name: "89th Academy Awards",
      id: 2,
      poster: "2017_Oscars_poster.jpg",
      __typename: "Edition"
    },
    {
      date: "2016-02-28",
      name: "88th Academy Awards",
      id: 8,
      poster:
        "b67e67830551ea34f84eb0edf7900236553b83045ca648f52711fe9838b7a681-699x1024.jpg",
      __typename: "Edition"
    },
    {
      date: "2015-02-22",
      name: "87th Academy Awards",
      id: 17,
      poster: "87thkeyart13.jpg",
      __typename: "Edition"
    }
  ],
  __typename: "EditionsConnection"
};

describe("AwardEditions.vue", () => {
  test("displays Spinner while query is loading", () => {
    const wrapper = createWrapper({
      mocks: {
        $apollo: {
          loading: true
        }
      }
    });

    expect(wrapper.find(Spinner).exists()).toBe(true);
  });
  test("does not display Spinner when loading is finished", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(Spinner).exists()).toBe(false);
  });
  test("displayed awards correctly with query data", () => {
    const wrapper = createWrapper();
    wrapper.setData({
      editions
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
