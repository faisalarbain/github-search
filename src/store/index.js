import GithubSearch from "@/service/GithubSearch";

export default {
  state: {
    per_page: 10,
    searchResults: []
  },
  mutations: {
    SET_RESULTS(state, result) {
      state.searchResults = result;
    }
  },
  getters: {
    results(state) {
      return state.searchResults.items;
    },
    totalResult(state) {
      return state.searchResults.total_count;
    }
  },
  actions: {
    search(context, {q, page}) {
      GithubSearch.search(q, page, context.state.per_page).then(result => {
        context.commit("SET_RESULTS", result);
      });
    }
  },
  modules: {}
};
