<template>
  <v-card>
    <v-img class="align-end" height="200px" :src="repo.owner.avatar_url">
      <v-card-title>{{ repo.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Staring: {{ repo.stargazers_count }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ repo.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn text>
        Bookmark
        <v-icon right size="28" color="pink">mdi-heart</v-icon>
      </v-btn>

      <v-btn text :href="repo.html_url">
        Explore
        <v-icon right size="28" color="orange">mdi-compass</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'RepoCard',

  props: {
    repo: {
      type: Object,
      required: true,
    },
  },
}
</script>
