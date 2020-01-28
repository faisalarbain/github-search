<template>
  <div>
    <h2 class="title is-6">{{ totalResult }} repository results</h2>
    <div v-for="(result, i) in results" :key="i" class="result-item">
      <div class="card-content">
        <div class="columns">
          <div class="column is-9">
            <div class="content">
              <p class="has-text-weight-bold is-size-5">
                <a target="_BLANK" :href="result.html_url">{{
                  result.full_name
                }}</a>
              </p>
              <p class="is-size-6">{{ result.description }}</p>
              <p class="help has-text-grey">{{ result.updated_at }}</p>
            </div>
          </div>
          <div class="column">
            <div class="columns">
              <div class="column">
                <item-tag icon="circle" :label="result.language" />
              </div>
              <div class="column">
                <item-tag icon="star" :label="result.stargazers_count" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <pagination
      @changePage="changePage"
      v-if="totalResult > perPage"
      :total="10"
      :current="current"
    />
  </div>
</template>

<script>
import ItemTag from "./ItemTag";
import Pagination from "./Pagination";

export default {
  components: {
    ItemTag,
    Pagination
  },
  props: {
    perPage: {
      type: Number,
      default: 0
    },
    current: {
      type: [Number, String],
      default: 1
    },
    totalResult: {
      type: Number,
      default: 0
    },
    results: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    changePage(page) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page
        }
      });
    }
  }
};
</script>
