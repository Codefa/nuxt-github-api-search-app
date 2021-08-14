export default {
  addToFavRepos(state, payload) {
    state.repos.push({ ...payload })
    // localStorage.setItem('favReops', JSON.stringify(state.repos))
  },

  removeFromFavRepos(state, payload) {
    state.repos.splice(state.repos.indexOf(payload), 1)
    // localStorage.setItem('favReops', JSON.stringify(state.repos))
  },

  addToFavUsers(state, payload) {
    state.users.push({ ...payload })
    // localStorage.setItem('favReops', JSON.stringify(state.users))
  },

  removeFromFavUsers(state, payload) {
    state.users.splice(state.users.indexOf(payload), 1)
    // localStorage.setItem('favReops', JSON.stringify(state.users))
  },
}
