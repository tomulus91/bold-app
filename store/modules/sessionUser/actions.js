import { types } from './mutations'
import mongoUsers from '~/assets/service/mongodb/users'
import serviceUsers from '~/assets/service/users.service'

export default {
  sessionForUser ({ state, commit }, dataUser) {
    if (state.userData.userIsLogged) {
      serviceUsers.removeLocalStorageForUsers()
      commit(types.SET_USER_IS_LOGGED, false)
      commit(types.REMOVE_USER_IS_ADMIN)
      commit(types.REMOVE_USER_NAME)
      commit(types.REMOVE_USER_TOKEN)
    } else {
      commit(types.SET_USER_IS_LOGGED, true)
      commit(types.SET_USER_NAME, dataUser.name)
      commit(types.SET_USER_TOKEN, dataUser.token)
      serviceUsers.addLocalStorageForUsers(dataUser).then(() => {
        serviceUsers.checkUserIsAdmin(state).then(response => {
          commit(types.SET_USER_IS_ADMIN, response.userIsAdmin)
        })
      }).catch(() => {
        console.log('Error setItem')
      })
    }
  },
  checkSession ({state, commit}) {
    serviceUsers.getLocalStorageForUsers().then((userData) => {
      if (userData !== false) {
        commit(types.SET_USER_IS_LOGGED, true)
        commit(types.SET_USER_NAME, userData.name)
        commit(types.SET_USER_TOKEN, userData.token)
        if (!state.userData.userIsAdmin) {
          serviceUsers.checkUserIsAdmin(state).then(response => {
            commit(types.SET_USER_IS_ADMIN, response.userIsAdmin)
          })
        }
      } else {
        commit(types.SET_USER_IS_LOGGED, false)
      }
    })
  },
  getUsers ({state, commit}) {
    const userPromise = mongoUsers.fetchUsers()
    userPromise
      .then(response => {
        if (response.data) {
          commit(types.GET_ALL_USERS, response.data)
        }
      }).catch(e => {
        console.log(e)
      })
  }
}
