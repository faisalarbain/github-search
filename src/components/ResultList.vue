<template>
  <div>
    result list!
  </div>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
