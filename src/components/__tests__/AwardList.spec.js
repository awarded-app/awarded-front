import { shallowMount, createLocalVue } from "@vue/test-utils";
import Awards from "../Awards.vue";
import Spinner from "../Spinner.vue";
import { HollowDotsSpinner } from "epic-spinners";

// create an extended `Vue` constructor
const localVue = createLocalVue();
localVue.component("hollow-dots-spinner", HollowDotsSpinner);

const awards = {
  totalCount: 3,
  nodes: [
    {
      id: 2,
      nameShort: "Berlinale",
      nameLong: "Berlin International Film Festival",
      logo: "berlinale.png",
      __typename: "Award"
    },
    {
      id: 3,
      nameShort: "Venice Film Festival",
      nameLong: "Venice International Film Festival",
      logo: "venice.png",
      __typename: "Award"
    },
    {
      id: 5,
      nameShort: "Oscars",
      nameLong: "Academy Awards",
      logo: "oscars.png",
      __typename: "Award"
    }
  ],
  __typename: "AwardsConnection"
};

describe("Awards.vue", () => {
  test("displays Spinner while query is loading", () => {
    const wrapper = shallowMount(Awards, {
      localVue,
      mocks: {
        $apollo: {
          loading: true
        }
      }
    });
    expect(wrapper.find(Spinner).exists()).toBe(true);
  });
  test("does not display Spinner when loading is finished", () => {
    const wrapper = shallowMount(Awards, {
      localVue,
      mocks: {
        $apollo: {
          loading: false
        }
      }
    });
    expect(wrapper.find(Spinner).exists()).toBe(false);
  });
  test("displayed awards correctly with query data", () => {
    const wrapper = shallowMount(Awards, {
      localVue,
      mocks: {
        $apollo: {
          loading: false
        }
      }
    });
    wrapper.setData({
      awards
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
