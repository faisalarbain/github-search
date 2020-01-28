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
  actions: {
    search(context, keyword) {
      GithubSearch.search(keyword)
        .then(GithubSearch.process)
        .then(result => {
          context.commit("SET_RESULTS", result);
        });
    }
  },
  modules: {}
};
