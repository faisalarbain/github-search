<template>
  <div class="level">
    <div class="level-left is-size-7">
      <div class="level-item"><icon style="height:10px;" :name="icon" /></div>
      <div class="level-item">{{ label }}</div>
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
    label: String,
    icon: String
  }
};
</script>
