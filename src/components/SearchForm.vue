<template>
  <div class="field ">
    <div class="control has-icons-right">
      <input
        @keypress.enter="submit"
        type="text"
        class="input"
        v-model="str"
        :class="{ 'is-danger': error }"
        placeholder="Search"
      />
      <span class="icon is-small is-right">
        <icon name="search" />
      </span>
    </div>
  </div>
</template>

<script>
import Icon from "./Icon";
export default {
  components: {
    Icon
  },
  props: {
    keyword: String,
    default() {
      return "";
    }
  },
  data() {
    return {
      str: this.keyword,
      error: false
    };
  },
  methods: {
    submit() {
      if (this.str) {
        this.$emit("search", this.str);
      } else {
        this.error = true;
      }
    }
  }
};
</script>
