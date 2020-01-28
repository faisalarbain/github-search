import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import SearchPage from "@/views/SearchPage";
import EmptyState from "@/components/EmptyState";

describe("search", function() {
  it("show empty state", function() {
    const wrapper = shallowMount(SearchPage);
    const emptyState = wrapper.find(EmptyState);
    expect(emptyState.exists()).to.be.true();
  });
  it("set value to search will not trigger search");
  it("press enter will trigger search");
  it("validate input. no input, show error message");
  it("show 10 results per page");
  it("can navigate to next page");
  it("show error message if no result");
  it("show all information required");
});
