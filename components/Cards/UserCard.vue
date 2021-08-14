<template>
  <v-card>
    <v-img class="align-end" height="200px" :src="user.avatar_url">
      <v-card-title class="white--text">{{ user.login }}</v-card-title>
    </v-img>

    <v-card-text class="text--primary">
      <div>{{ user.repos_url }}</div>
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

      <v-btn text :href="user.html_url">
        {{ $t('card.explore') }}
        <v-icon right size="28" color="orange">mdi-compass</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserCard',

  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapGetters({
      isFavoritedUser: 'favorites/isFavoritedUser',
    }),

    isFavorited() {
      return this.isFavoritedUser(this.user.id)
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
        this.$store.commit('favorites/removeFromFavUsers', this.user)
      } else {
        this.$store.commit('favorites/addToFavUsers', this.user)
      }
    },
  },
}
</script>
