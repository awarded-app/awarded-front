import { createLocalVue, shallowMount } from "@vue/test-utils";
import FontAwesomeIcon from "../../plugins/FontAwesomeIcon";
import PlusSign from "../PlusSign";

// create an extended `Vue` constructor
const localVue = createLocalVue();
localVue.component("font-awesome-icon", FontAwesomeIcon);

describe("PlusSign.vue", () => {
  const wrapper = shallowMount(PlusSign, { localVue });

  test("expect default open to be false", () => {
    expect(wrapper.vm.open).toBe(false);
  });

  test("expect open to be false when clicked on main div", () => {
    const div = wrapper.find("div");
    div.trigger("click");
    expect(wrapper.vm.open).toBe(true);
  });

  test("expect icon to be plus if open is false", () => {
    wrapper.vm.open = false;
    expect(wrapper.vm.icon).toBe("plus");
  });
  test("expect icon to be minus if open is true", () => {
    wrapper.vm.open = true;
    expect(wrapper.vm.icon).toBe("minus");
  });
});
