<template>
  <div>
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
                v-for="(repo, index) in repos"
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
                v-for="(user, index) in users"
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
    users: [],
    items: [
      { tab: 'Repos', content: 'Tab 1 Content', key: 'vue' },
      { tab: 'Users', content: 'Tab 2 Content', key: 'users' },
      { tab: 'Favorites', content: 'Tab 3 Content' },
    ],
  }),

  methods: {
    getData(val) {
      if (val === 'users' && this.users.length === 0) {
        this.getUsers()
      }
    },

    async getUsers() {
      const users = await this.$axios.$get('users?since=1')
      this.users = users
    },
  },
}
</script>
