<template>
  <div>
    <v-text-field
      v-model="search"
      :label="computedSearchLabel"
      autocomplete="off"
      single-line
      clearable
      @click:clear="search = ''"
    >
      <template #append-outer>
        <v-btn color="success" @click="searchMe">
          search
          <v-icon right size="25">mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in items" :key="item.tab" @click="getData(item.key)">
        {{ item.tab }}
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
    const repos = await $axios.$get('orgs/vuejs/repos')
    return { repos }
  },

  data: () => ({
    tab: null,
    tabKey: 'vue',
    search: '',
    users: [],
    items: [
      { tab: 'Repos', key: 'vue' },
      { tab: 'Users', key: 'users' },
      { tab: 'Favorites', key: 'fav' },
    ],
    searchedRepos: [],
    searchedUsers: [],
  }),

  computed: {
    computedSearchLabel() {
      return this.tabKey === 'users'
        ? 'search for users'
        : 'search for vue repos'
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
  },
}
</script>
