export const types = {
  GET_ALL_USERS: 'GET_ALL_USERS',
  SET_USER_IS_LOGGED: 'SET_USER_IS_LOGGED',
  SET_USER_IS_ADMIN: 'SET_USER_IS_ADMIN',
  SET_USER_NAME: 'SET_USER_NAME',
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  REMOVE_USER_IS_ADMIN: 'REMOVE_USER_IS_ADMIN',
  REMOVE_USER_NAME: 'REMOVE_USER_NAME',
  REMOVE_USER_TOKEN: 'REMOVE_USER_TOKEN'
}

export const mutations = {
  [types.SET_USER_IS_LOGGED] (state, value) {
    state.userData.userIsLogged = value
  },
  [types.SET_USER_IS_ADMIN] (state, value) {
    state.userData.userIsAdmin = value
  },
  [types.SET_USER_NAME] (state, value) {
    state.userData.nameUser = value
  },
  [types.SET_USER_TOKEN] (state, value) {
    state.userData.tokenUser = value
  },
  [types.REMOVE_USER_IS_ADMIN] (state) {
    state.userData.userIsAdmin = false
  },
  [types.REMOVE_USER_NAME] (state) {
    state.userData.nameUser = ''
  },
  [types.REMOVE_USER_TOKEN] (state) {
    state.userData.tokenUser = ''
  },
  [types.GET_ALL_USERS] (state, dataUsers) {
    state.users = dataUsers
  }
}

