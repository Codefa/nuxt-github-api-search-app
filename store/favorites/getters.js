export default {
  getFavoritedRepos: (state) => {
    return state.repos
  },

  getFavoritedUsers: (state) => {
    return state.users
  },

  isFavoritedRepo: (state) => (id) => {
    return state.repos.find((repo) => repo.id === id)
  },

  isFavoritedUser: (state) => (id) => {
    return state.users.find((user) => user.id === id)
  },
}
