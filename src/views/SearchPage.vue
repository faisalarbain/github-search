<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="column" style="margin-bottom:20px;">
        <h1 class="title is-5 has-text-grey">Github Search</h1>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="columns is-multiline">
            <div class="column is-12 stickyHeader">
              <search-form @search="search" :keyword="keyword" />
            </div>
            <div class="column is-12">
              <empty-state v-if="current.matches('empty')" />
              <div v-if="current.matches('searching')" class="hero">
                <div class="hero-body">
                  <div style="width:100%">
                    <span
                      class="button is-loading is-fullwidth is-white"
                    ></span>
                  </div>
                </div>
              </div>
              <div v-if="current.matches('showResult')">
                <result-list
                  v-if="totalResult > 0"
                  :results="results"
                  :total-result="totalResult"
                />
                <div v-else>
                  <div class="notification is-light is-warning ">
                    <div class="content">
                      <p><b>Opps... No result found</b></p>
                      <a href="/" class="button is-outlined is-dark is-rounded"
                        >Reset search</a
                      >
                    </div>
                  </div>
                </div>
                <pagination
                  @changePage="changePage"
                  v-if="totalResult > perPage"
                  :total="10"
                  :current="currentPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Machine, interpret } from "xstate";
import Pagination from "@/components/Pagination";
import ResultList from "@/components/ResultList";
import EmptyState from "@/components/EmptyState";
import SearchForm from "@/components/SearchForm";

const SearchStates = Machine({
  initial: "empty",
  states: {
    empty: {
      on: {
        search: {
          target: "searching",
          cond: (_context, event) => {
            return event.q;
          }
        }
      }
    },
    searching: {
      onEntry: ["doSearch"],
      on: {
        success: "#showResult",
        failed: "#showError"
      }
    },
    showResult: {
      id: "showResult",
      on: {
        search: "searching"
      }
    },
    showError: {
      id: "showError",
      on: {
        search: "searching"
      }
    }
  }
});

export default {
  components: {
    EmptyState,
    SearchForm,
    ResultList,
    Pagination
  },
  data() {
    return {
      current: SearchStates.initialState,
      fsm: interpret(SearchStates)
        .onTransition(state => {
          this.current = state;
          state.actions.forEach(action => {
            if (this[action]) {
              this[action]();
            }
          });
        })
        .start(),
      searchQuery: {
        q: "",
        page: 1
      }
    };
  },
  mounted() {
    this.searchQuery = this.$route.query;
    this.send("search", this.searchQuery);
  },
  methods: {
    send(event, data) {
      this.fsm.send(event, data);
    },
    doSearch() {
      this.$router.push({
        path: this.$route.path,
        query: this.searchQuery
      });

      this.$store
        .dispatch("search", this.searchQuery)
        .then(() => {
          this.send("success");
        })
        .catch(() => {
          this.send("failed");
        });
    },
    search(keyword) {
      this.searchQuery = {
        q: keyword,
        page: 1
      };

      this.send("search", this.searchQuery);
    },
    changePage(page) {
      this.searchQuery = {
        ...this.searchQuery,
        page: page
      };

      this.send("search", this.searchQuery);
    }
  },
  computed: {
    keyword() {
      return this.$route.query.q;
    },
    results() {
      return this.$store.getters.results;
    },
    totalResult() {
      return this.$store.getters.totalResult;
    },
    perPage() {
      return this.$store.state.per_page;
    },
    currentPage() {
      return this.$route.query.page;
    }
  }
};
</script>
