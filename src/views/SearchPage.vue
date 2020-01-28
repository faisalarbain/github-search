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
      this.$router.push({ path: this.$route.path, query: { q: keyword } });
    }
  }
};
</script>
