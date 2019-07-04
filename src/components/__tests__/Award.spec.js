import { shallowMount } from "@vue/test-utils";
import Award from "../Award.vue";
import EditionList from "../EditionList";
import PlusSign from "../PlusSign";

const award = {
  id: 2,
  nameShort: "Berlinale",
  nameLong: "Berlin International Film Festival",
  logo: "berlinale.png",
  __typename: "Award"
};

describe("Award.vue", () => {
  const wrapper = shallowMount(Award, {
    propsData: {
      award
    }
  });

  test("displays short name as H1 title", () => {
    expect(wrapper.find("h1").text()).toBe(award.nameShort);
  });
  test("contains PlusSign child component", () => {
    expect(wrapper.find(PlusSign).exists()).toBe(true);
  });
  test("expect showEditions to start as false", () => {
    expect(wrapper.vm.showEditions).toBe(false);
  });
  test("toggle showEditions property when toggleEditions is called", () => {
    expect(wrapper.vm.showEditions).toBe(false);
    wrapper.vm.toggleEditions();
    expect(wrapper.vm.showEditions).toBe(true);
  });
  test("display EditionList when toggleEditions is called", () => {
    wrapper.vm.showEditions = false;
    expect(wrapper.find(EditionList).exists()).toBe(false);
    wrapper.vm.toggleEditions();
    expect(wrapper.find(EditionList).exists()).toBe(true);
  });
  test("if showEditions is false, do not display EditionList", () => {
    wrapper.vm.showEditions = false;
    expect(wrapper.find(EditionList).exists()).toBe(false);
  });
  test("if showEditions is true, display EditionList", () => {
    wrapper.vm.showEditions = true;
    expect(wrapper.find(EditionList).exists()).toBe(true);
  });
});
