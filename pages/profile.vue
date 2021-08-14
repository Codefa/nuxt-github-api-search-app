<template>
  <v-container>
    <h1 class="text-center">
      {{ $t('profile') }}
    </h1>
    <v-divider></v-divider>
    <v-card class="mx-auto" max-width="534" tile>
      <v-img
        height="100%"
        src="https://cdn.vuetifyjs.com/images/cards/server-room.jpg"
      >
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img :src="$auth.user.avatar_url"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="text-h6">
                  {{ $auth.user.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  $auth.user.email
                }}</v-list-item-subtitle>
                <v-list-item-subtitle>{{
                  $auth.user.bio
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Profile',
  middleware: 'auth',
}
</script>
