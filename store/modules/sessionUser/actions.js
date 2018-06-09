import { types } from './mutations'

export default {
  sessionForUser ({ state, commit }, dataUser) {
    state.userData.userIsLogged
      ? commit(types.REMOVE_SESSION_LOGGED_USER)
      : commit(types.ADD_SESSION_LOGGED_USER, dataUser)
  },
  checkSession ({state, commit}) {
    commit(types.CHECK_SESSION_USER)
  },
  getUsers ({state, commit}) {
    commit(types.GET_ALL_USERS)
  }
}
