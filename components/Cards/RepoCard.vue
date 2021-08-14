<template>
  <v-card>
    <v-img class="align-end" height="200px" :src="repo.owner.avatar_url">
      <v-card-title>{{ repo.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ $t('card.staring') }}: {{ repo.stargazers_count }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ repo.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text data-test="bookmarkToggle" @click="addToFav">
        {{ bookmarkLabel }}
        <v-icon
          right
          data-test="bookmarkIcon"
          size="28"
          :color="bookmarkIconColor"
        >
          mdi-heart
        </v-icon>
      </v-btn>

      <v-btn text :href="repo.html_url">
        {{ $t('card.explore') }}
        <v-icon right size="28" color="orange">mdi-compass</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'RepoCard',

  props: {
    repo: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      isFavoritedRepo: 'favorites/isFavoritedRepo',
    }),

    isFavorited() {
      return this.isFavoritedRepo(this.repo.id)
    },

    bookmarkLabel() {
      return this.isFavorited
        ? this.$t('card.bookmarked')
        : this.$t('card.bookmark')
    },

    bookmarkIconColor() {
      return this.isFavorited ? 'pink' : 'gray'
    },
  },

  methods: {
    addToFav() {
      if (this.isFavorited) {
        this.$store.commit('favorites/removeFromFavRepos', this.repo)
      } else {
        this.$store.commit('favorites/addToFavRepos', this.repo)
      }
    },
  },
}
</script>
