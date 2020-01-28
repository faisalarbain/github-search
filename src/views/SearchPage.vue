<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="column" style="margin-bottom:20px;">
        <h1 class="title is-5 has-text-grey">Github Search</h1>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="columns is-multiline">
            <div class="column is-12 stickyHeader">
              <search-form @search="search" />
            </div>
            <div class="column is-12">
              <empty-state v-if="!totalResult" />
              <result-list
                :results="results"
                :total-result="totalResult"
                :per-page="perpage"
                v-if="totalResult"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultList from "@/components/ResultList";
import EmptyState from "@/components/EmptyState";
import SearchForm from "@/components/SearchForm";
export default {
  components: {
    EmptyState,
    SearchForm,
    ResultList
  },
  watch: {
    $route() {
      this.$store.dispatch("search", this.$route.query);
    }
  },
  methods: {
    search(keyword) {
      this.$router.push({
        path: this.$route.path,
        query: { q: keyword, page: 1 }
      });
    }
  },
  computed: {
    results() {
      return this.$store.getters.results;
    },
    totalResult() {
      return this.$store.getters.totalResult;
    },
    perpage() {
      return this.$store.state.per_page;
    }
  }
};
</script>
