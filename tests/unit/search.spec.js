import Vuex from "vuex";
import sinon from "sinon";
import * as R from "ramda";
import store from "@/store";
import { expect } from "chai";
import fixture from "./fixture";
import VueRouter from "vue-router";
import SearchPage from "@/views/SearchPage";
import EmptyState from "@/components/EmptyState";
import Pagination from "@/components/Pagination";
import ResultList from "@/components/ResultList";
import SearchForm from "@/components/SearchForm";
import GithubSearch from "@/service/GithubSearch";
import Paginator from "@/service/Paginator";
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
      searchForm: () => wrapper.find(SearchForm),
      resultList: () => wrapper.find(ResultList)
    };
  };

  it("show empty state", function() {
    const { emptyState, searchForm, resultList } = build();
    expect(emptyState().exists()).equal(true);
    expect(searchForm().exists()).equal(true);
    expect(resultList().exists()).equal(false);
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

    const { wrapper, resultList, emptyState } = build();

    wrapper.vm.search("react");
    expect(wrapper.vm.$route.query.q).equal("react");

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.results).has.lengthOf(10);
    expect(wrapper.vm.totalResult).equal(fixture["200"].total_count);

    expect(resultList().exists()).equal(true);
    expect(emptyState().exists()).equal(false);

    expect(resultList().vm.$props.results).has.lengthOf(10);
    expect(resultList().vm.$props.totalResult).equal(
      fixture["200"].total_count
    );
  });

  it("hide pagination if result less than 10", function() {
    const resultList = mount(ResultList, {
      propsData: {
        totalResult: 9,
        perPage: 10
      }
    });

    expect(resultList.find(Pagination).exists()).equal(false);
  });

  it("hide pagination if result less equal 10", function() {
    const resultList = mount(ResultList, {
      propsData: {
        totalResult: 10,
        perPage: 10
      }
    });

    expect(resultList.find(Pagination).exists()).equal(false);
  });

  it("show pagination if result more than 10", function() {
    const resultList = mount(ResultList, {
      propsData: {
        totalResult: 11,
        perPage: 10
      }
    });
    expect(resultList.find(Pagination).exists()).equal(true);
  });
  it("can navigate to next page");
  it("show error message if no result");
  it("show all information required");
});

describe("paginator", function() {
  const params = [
    { total: 2, current: 1, expected: [1, 2] },
    { total: 3, current: 2, expected: [1, 2, 3] },
    { total: 4, current: 1, expected: [1, 2, 3, 4] },
    { total: 5, current: 1, expected: [1, 2, 3, "...", 5] },
    { total: 6, current: 1, expected: [1, 2, 3, "...", 6] },
    { total: 10, current: 3, expected: [1, 2, 3, 4, 5, "...", 10] },
    { total: 10, current: 8, expected: [1, "...", 6, 7, 8, 9, 10] },
    {
      total: 20,
      current: 10,
      expected: [1, "...", 8, 9, 10, 11, 12, "...", 20]
    },
    {
      total: 5,
      current: 4,
      expected: [1, 2, 3, 4, 5]
    }
  ];

  params.forEach(item => {
    it(`total: ${item.total}, current: ${item.current}`, function() {
      const output = Paginator(item.total, item.current);
      expect(output).to.deep.equal(item.expected);
      expect(output.current).equal(item.current);
    });
  });
});
