import GithubSearch from "@/service/GithubSearch";

export default {
  state: {
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
    search(context, keyword) {
      GithubSearch.search(keyword).then(result => {
        context.commit("SET_RESULTS", result);
      });
    }
  },
  modules: {}
};
