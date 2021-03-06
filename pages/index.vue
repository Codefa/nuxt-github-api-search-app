<template>
  <div>
    <v-text-field
      v-model="search"
      data-test-search-input
      :label="computedSearchLabel"
      autocomplete="off"
      single-line
      clearable
      @click:clear="clearSearch"
    >
      <template #append-outer>
        <v-btn data-test-search-btn color="success" @click="searchMe">
          {{ $t('search') }}
          <v-icon right size="25">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in items" :key="item.tab" @click="getData(item.key)">
        {{ $t(item.tab) }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <div v-if="item.key === 'vue'">
          <v-container>
            <v-row>
              <v-col
                v-for="(repo, index) in computedRepos"
                :key="index"
                cols="12"
                sm="4"
              >
                <RepoCard :repo="repo" />
              </v-col>
              <v-btn
                v-if="searchedRepos.length === 0"
                data-test-repos-loadmore-btn
                class="mx-auto mb-4"
                @click="loadMoreRepos"
              >
                {{ $t('loadMore') }}
              </v-btn>
            </v-row>
          </v-container>
        </div>

        <div v-if="item.key === 'users'">
          <v-container>
            <v-row class="mb-6">
              <v-col
                v-for="(user, index) in computedUsers"
                :key="index"
                cols="12"
                sm="4"
              >
                <userCard :user="user" />
              </v-col>
              <v-btn
                v-if="searchedUsers.length === 0"
                data-test-users-loadmore-btn
                class="mx-auto mb-4"
                @click="loadMoreUsers"
              >
                {{ $t('loadMore') }}
              </v-btn>
            </v-row>
          </v-container>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
export default {
  name: 'Index',

  components: {
    RepoCard: () => import('~/components/Cards/RepoCard'),
    UserCard: () => import('~/components/Cards/UserCard'),
  },

  async asyncData({ $axios }) {
    const repos = await $axios.$get('orgs/vuejs/repos?per_page=12')
    return { repos }
  },

  data: () => ({
    tab: null,
    tabKey: 'vue',
    search: '',
    users: [],
    items: [
      { tab: 'repos', key: 'vue' },
      { tab: 'users', key: 'users' },
    ],
    searchedRepos: [],
    searchedUsers: [],
    pageNumber: 1,
  }),

  computed: {
    computedSearchLabel() {
      return this.tabKey === 'users'
        ? this.$t('userSearchLabel')
        : this.$t('repoSearchLabel')
    },

    computedRepos() {
      if (this.search && this.searchedRepos.length !== 0) {
        return this.searchedRepos
      }
      return this.repos
    },

    computedUsers() {
      if (this.search && this.searchedUsers.length !== 0) {
        return this.searchedUsers
      }
      return this.users
    },

    defaultArray() {
      if (this.tabKey === 'users') {
        return this.users
      }
      return this.repos
    },

    lastUserId() {
      const [lastUserId] = this.users.slice(-1)
      return lastUserId.id
    },
  },

  watch: {
    search(val) {
      if (val === '') {
        this.clearSearch()
      }
    },
  },

  methods: {
    getData(val) {
      this.search = ''
      this.tabKey = val
      if (val === 'users' && this.users.length === 0) {
        this.getUsers()
      }
    },

    async getUsers() {
      const users = await this.$axios.$get('users?since=1')
      this.users = users
    },

    searchMe() {
      if (this.tabKey === 'vue') {
        this.searchRepos()
      } else if (this.tabKey === 'users') {
        this.searchUsers()
      }
    },

    clearSearch() {
      this.search = ''
      this.searchedRepos = []
      this.searchedUsers = []
    },

    async searchRepos() {
      if (!this.search) return this.defaultArray
      const result = await this.$axios.$get(
        `search/repositories?q=${this.search}+org:vuejs`
      )
      this.searchedRepos = result.items
    },

    async searchUsers() {
      if (!this.search) return this.defaultArray
      const result = await this.$axios.$get(
        `search/users?q=${this.search.trim('')}`
      )
      this.searchedUsers = result.items
    },

    async loadMoreRepos() {
      this.pageNumber = this.pageNumber + 1
      const repos = await this.$axios.$get(
        `orgs/vuejs/repos?page=${this.pageNumber}&per_page=12`
      )
      this.repos.push(...repos)
    },

    async loadMoreUsers() {
      const users = await this.$axios.$get(
        `https://api.github.com/users?since=${this.lastUserId}`
      )
      this.users.push(...users)
    },
  },
}
</script>
