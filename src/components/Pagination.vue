<template>
  <nav class="pagination is-centered" role="navigation" aria-label="pagination">
    <ul class="pagination-list">
      <template v-for="(p, i) in pages">
        <li :key="i" v-if="p == '...'">
          <span class="pagination-ellipsis">&hellip;</span>
        </li>
        <li :key="i" v-else>
          <a
            @click="$emit('changePage', p)"
            class="pagination-link"
            :class="{ 'is-current is-light': pages.current == p }"
            :aria-label="`Goto page ${p}`"
            >{{ p }}</a
          >
        </li>
      </template>
    </ul>
  </nav>
</template>

<script>
import Paginator from "@/service/Paginator";

export default {
  props: {
    total: Number,
    current: [Number, String]
  },
  computed: {
    pages() {
      return Paginator(this.total, this.current);
    }
  }
};
</script>
