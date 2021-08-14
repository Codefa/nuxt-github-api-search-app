export default {
  addToFavRepos(state, payload) {
    state.repos.push({ ...payload })
    // localStorage.setItem('favReops', JSON.stringify(state.repos))
  },

  removeFromFavRepos(state, payload) {
    state.repos.splice(
      state.repos.findIndex((r) => r.id === payload.id),
      1
    )
    // localStorage.setItem('favReops', JSON.stringify(state.repos))
  },

  addToFavUsers(state, payload) {
    state.users.push({ ...payload })
    // localStorage.setItem('favReops', JSON.stringify(state.users))
  },

  removeFromFavUsers(state, payload) {
    state.users.splice(
      state.users.findIndex((u) => u.id === payload.id),
      1
    )
    // localStorage.setItem('favReops', JSON.stringify(state.users))
  },
}
