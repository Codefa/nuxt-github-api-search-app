<template>
  <v-container>
    <h1 class="text-center">Favorites</h1>
    <v-divider></v-divider>
    <v-tabs v-model="tab" background-color="primary" dark>
      <v-tab v-for="item in items" :key="item.tab">
        {{ item.tab }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <div v-if="item.key === 'vue'">
          <v-container>
            <v-row>
              <v-col
                v-for="(repo, index) in favRepos"
                :key="index"
                cols="12"
                sm="4"
              >
                <RepoCard :repo="repo" />
              </v-col>
            </v-row>
            <v-row v-if="favRepos.length === 0" justify="center" align="center">
              <v-img
                max-height="250"
                max-width="250"
                src="https://cdn.dribbble.com/users/12570/screenshots/13987694/media/1635918fab6854e489723a301619b7b2.jpg"
              ></v-img>
            </v-row>
          </v-container>
        </div>

        <div v-if="item.key === 'users'">
          <v-container>
            <v-row class="mb-6">
              <v-col
                v-for="(user, index) in favUsers"
                :key="index"
                cols="12"
                sm="4"
              >
                <userCard :user="user" />
              </v-col>
            </v-row>
            <v-row v-if="favUsers.length === 0" justify="center" align="center">
              <v-img
                max-height="250"
                max-width="250"
                src="https://cdn.dribbble.com/users/12570/screenshots/13987694/media/1635918fab6854e489723a301619b7b2.jpg"
              ></v-img>
            </v-row>
          </v-container>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Favorites',

  components: {
    RepoCard: () => import('~/components/Cards/RepoCard'),
    UserCard: () => import('~/components/Cards/UserCard'),
  },

  middleware: 'auth',

  data: () => ({
    tab: null,
    items: [
      { tab: 'Repos', key: 'vue' },
      { tab: 'Users', key: 'users' },
    ],
  }),

  computed: {
    ...mapGetters({
      favRepos: 'favorites/getFavoritedRepos',
      favUsers: 'favorites/getFavoritedUsers',
    }),
  },
}
</script>