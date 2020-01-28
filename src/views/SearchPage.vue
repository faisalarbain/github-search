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
    search() {
      alert("Search!");
    }
  }
};
</script>
