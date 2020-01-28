<template>
  <div>
    <input
      @keypress.enter="submit"
      type="text"
      class="input"
      v-model="keyword"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    submit() {
      this.$emit("search", this.keyword);
    }
  }
};
</script>
