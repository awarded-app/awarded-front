import { shallowMount, createLocalVue } from "@vue/test-utils";
import mergeWith from "lodash.mergewith";
import { customizer } from "./helper";
import EditionListItem from "../EditionListItem";
import NominationList from "../NominationList";
import PlusSign from "../PlusSign";

const localVue = createLocalVue();

const edition = {
  date: "2017-02-26",
  name: "89th Academy Awards",
  id: 2,
  poster: "2017_Oscars_poster.jpg",
  __typename: "Edition"
};

function createWrapper(overrides) {
  const defaultMountingOptions = {
    data() {
      return {
        showNominations: false
      };
    },
    propsData: {
      edition
    },
    mocks: {
      $apollo: {
        loading: false
      }
    },
    localVue
  };
  return shallowMount(
    EditionListItem,
    mergeWith(defaultMountingOptions, overrides, customizer)
  );
}

describe("EditionListItem.vue", () => {
  test("contains PlusSign child component", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(PlusSign).exists()).toBe(true);
  });
  test("on load, does not show nominations", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(NominationList).exists()).toBe(false);
  });
  test("on click on PlusSign, toggle showNominations", () => {
    const wrapper = createWrapper();
    //expect(wrapper.vm.showNominations).toBe(false);
    const plusSign = wrapper.find(PlusSign);
    wrapper.vm.toggleNominations = jest.fn();
    //plusSign.trigger("click");
    plusSign.trigger("click");
    //const button = wrapper.find("button");
    //button.trigger("click");
    expect(wrapper.vm.toggleNominations).toBeCalled();
  });
  test("if showNominations is true, shows nominations components", () => {
    const wrapper = createWrapper();
    expect(wrapper.find(NominationList).exists()).toBe(false);
    wrapper.setData({ showNominations: true });
    expect(wrapper.find(NominationList).exists()).toBe(true);
  });
});
