<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-btn icon @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon>
          {{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-weather-cloudy' }}
        </v-icon>
      </v-btn>
      <v-toolbar-title data-test-app-title v-text="$t(title)" />
      <v-spacer />
      <select v-model="$i18n.locale">
        <option
          v-for="lang in $i18n.locales"
          :key="lang.code"
          :value="lang.code"
        >
          {{ lang.name }}
        </option>
      </select>
      <div v-if="$auth.loggedIn">
        <v-avatar style="cursor: pointer" @click="$router.push('/profile')">
          <img :src="$auth.user.avatar_url" :alt="$auth.user.login" />
        </v-avatar>
        <strong
          class="mr-4"
          style="cursor: pointer"
          @click="$router.push('/profile')"
        >
          {{ $auth.user.login }}
        </strong>
        <v-btn class="text-capitalize" outlined text @click="logout">
          {{ $t('layout.logout') }}
        </v-btn>
      </div>
      <v-btn
        v-else
        class="text-capitalize"
        text
        outlined
        data-test-app-login
        @click="loginWithGithub"
      >
        {{ $t('layout.login') }}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          color: 'green',
          title: 'layout.leftDrawer.welcome',
          to: '/',
        },
        {
          icon: 'mdi-heart',
          color: 'pink',
          title: 'layout.leftDrawer.favorites',
          to: '/favorites',
        },
      ],
      miniVariant: false,
      title: 'layout.appTitle',
    }
  },

  methods: {
    async loginWithGithub() {
      try {
        await this.$auth.loginWith('github')
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
      }
    },

    logout() {
      this.$auth.logout()
    },
  },
}
</script>
