<template>
  <div>
    <search-form />
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
    search() {}
  }
};
</script>
