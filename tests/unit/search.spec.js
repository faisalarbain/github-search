import { expect } from "chai";
import { mount } from "@vue/test-utils";
import SearchPage from "@/views/SearchPage";
import EmptyState from "@/components/EmptyState";
import SearchForm from "@/components/SearchForm";

describe("search", function() {
  const build = () => {
    const wrapper = mount(SearchPage);

    return {
      wrapper,
      emptyState: () => wrapper.find(EmptyState),
      searchForm: () => wrapper.find(SearchForm)
    };
  };

  it("show empty state", function() {
    const { emptyState, searchForm } = build();
    expect(emptyState().exists()).equal(true);
    expect(searchForm().exists()).equal(true);
  });

  it("set value to search will not trigger search", function() {
    const { emptyState, searchForm } = build();

    const input = searchForm().find(".input");
    expect(input.exists()).equal(true);
    input.setValue("vue");
    expect(searchForm().vm.$data.keyword).to.equal("vue");

    expect(emptyState().exists()).equal(true);
  });

  it("press enter will trigger search");
  it("validate input. no input, show error message");
  it("show 10 results per page");
  it("can navigate to next page");
  it("show error message if no result");
  it("show all information required");
});
