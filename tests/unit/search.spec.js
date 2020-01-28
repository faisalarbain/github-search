import Vuex from "vuex";
import sinon from "sinon";
import * as R from "ramda";
import store from "@/store";
import { expect } from "chai";
import fixture from "./fixture";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage";
import EmptyState from "@/components/EmptyState";
import SearchForm from "@/components/SearchForm";
import GithubSearch from "@/service/GithubSearch";
import { mount, createLocalVue } from "@vue/test-utils";

describe("search", function() {
  beforeEach(function() {
    sinon.restore();
  });

  const build = () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    localVue.use(Vuex);
    const router = new VueRouter();

    const wrapper = mount(SearchPage, {
      localVue,
      router,
      store: new Vuex.Store(R.clone(store))
    });

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
    const { emptyState, searchForm, wrapper } = build();

    const searchStub = sinon.stub();

    wrapper.setMethods({
      search: searchStub
    });

    searchForm()
      .find(".input")
      .setValue("vue");

    expect(searchForm().vm.$data.keyword).to.equal("vue");

    expect(emptyState().exists()).equal(true);
    expect(searchStub.called).equal(false);
  });

  it("press enter will trigger search", function() {
    const { searchForm, wrapper } = build();

    const input = searchForm().find(".input");
    input.setValue("vue");
    input.trigger("keypress.enter");

    expect(wrapper.vm.$route.query.q).equal("vue");
    expect(wrapper.vm.$route.query.page).equal(1);
  });

  it("validate input. no input, show error message", function() {
    const { searchForm, wrapper } = build();

    const searchStub = sinon.stub();

    wrapper.setMethods({
      search: searchStub
    });

    const input = searchForm().find(".input");
    input.setValue("");
    input.trigger("keypress.enter");

    expect(searchStub.called).equal(false);
    expect(
      searchForm()
        .find(".is-danger")
        .exists()
    );
  });

  it("show 10 results per page", async function() {
    const fake = sinon.fake.returns(Promise.resolve(fixture["200"]));
    sinon.replace(GithubSearch, "search", fake);

    const { wrapper } = build();

    wrapper.vm.search("react");
    expect(wrapper.vm.$route.query.q).equal("react");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.results).has.lengthOf(10);
    expect(wrapper.vm.totalResult).equal(fixture["200"].total_count);
  });

  it("can navigate to next page");
  it("show error message if no result");
  it("show all information required");
});
