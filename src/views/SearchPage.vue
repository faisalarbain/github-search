<template>
  <div>
    <search-form @search="search" />
    <empty-state />
  </div>
</template>

<script>
import EmptyState from "@/components/EmptyState";
import SearchForm from "@/components/SearchForm";
export default {
  components: {
    EmptyState,
    SearchForm
  },
  methods: {
    search(keyword) {
      this.$router.push({
        path: this.$route.path,
        query: { q: keyword, page: 1 }
      });

      this.$store.dispatch("search", keyword);
    }
  },
  computed: {
    results() {
      return this.$store.getters.results;
    },
    totalResult() {
      return this.$store.getters.totalResult;
    }
  }
};
</script>
