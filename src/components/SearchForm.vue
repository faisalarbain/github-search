<template>
  <div class="field ">
    <div class="control has-icons-right">
      <input
        @keypress.enter="submit"
        type="text"
        class="input"
        v-model="keyword"
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
import Icon from './Icon'
export default {
  components:{
    Icon
  },
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
