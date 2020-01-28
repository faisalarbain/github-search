<template>
  <div>
    <input
      @keypress.enter="submit"
      type="text"
      class="input"
      v-model="keyword"
      :class="{ 'is-danger': error }"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: "",
      error: false
    };
  },
  methods: {
    submit() {
      if (this.keyword) {
        this.$emit("search", this.keyword);
      } else {
        this.error = true;
      }
    }
  }
};
</script>
