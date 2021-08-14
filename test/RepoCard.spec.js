import { mount, createLocalVue } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import getters from '~/store/favorites/getters'
import state from '~/store/favorites/state'
import mutations from '~/store/favorites/mutations'
import RepoCard from '~/components/Cards/RepoCard.vue'

const favorites = {
  namespaced: true,
  state,
  mutations,
  getters,
}

Vue.use(Vuetify)
Vue.use(Vuex)

Vue.prototype.$store = new Vuex.Store({
  modules: {
    favorites,
  },
})

describe('RepoCard', () => {
  let vuetify
  const localVue = createLocalVue()

  beforeEach(() => {
    vuetify = new Vuetify()
  })

  const mountFunction = (options) => {
    return mount(RepoCard, {
      localVue,
      vuetify,
      ...options,
    })
  }

  it('should have a title name and vue instance', () => {
    const wrapper = mountFunction({
      propsData: {
        repo: {
          name: 'vue-router',
          owner: {
            name: 'vue',
          },
        },
      },
    })

    expect(wrapper.vm).toBeTruthy()
    const title = wrapper.find('.v-card__title')

    expect(title.text()).toBe('vue-router')
  })

  it('should click the bookmark button', () => {
    const wrapper = mountFunction({
      propsData: {
        repo: {
          name: 'vue-router',
          owner: {
            name: 'vue',
          },
        },
      },
    })

    expect(
      wrapper.find('.v-icon[data-test="bookmarkIcon"]').classes('gray--text')
    ).toBe(true)

    expect(
      wrapper.find('.v-icon[data-test="bookmarkIcon"]').classes('pink--text')
    ).toBe(false)

    expect(wrapper.find('.v-btn[data-test="bookmarkToggle"]').trigger('click'))

    wrapper.vm.$nextTick(() => {
      expect(
        wrapper.find('.v-icon[data-test="bookmarkIcon"]').classes('gray--text')
      ).toBe(false)

      expect(
        wrapper.find('.v-icon[data-test="bookmarkIcon"]').classes('pink--text')
      ).toBe(true)
    })
  })
})
