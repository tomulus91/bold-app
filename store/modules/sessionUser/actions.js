import { types } from './mutations'
import localStorage from '@/plugins/localforage'
import settingsApplicationService from '@/assets/service/settingsApplication'
import usersService from '~/assets/service/users'
import PasswordApi from '@/plugins/PasswordApi'

const LocalStorageName = {
  USER_DATA: 'USER_DATA'
}

export default {
  sessionForUser ({ state, commit }, dataUser) {
    if (state.userData.userIsLogged) {
      localStorage.removeItem(LocalStorageName.USER_DATA)
      commit(types.SET_USER_IS_LOGGED, false)
      commit(types.REMOVE_USER_IS_ADMIN)
      commit(types.REMOVE_USER_NAME)
      commit(types.REMOVE_USER_TOKEN)
    } else {
      commit(types.SET_USER_IS_LOGGED, true)
      commit(types.SET_USER_IS_ADMIN, false)
      commit(types.SET_USER_NAME, dataUser.name)
      commit(types.SET_USER_TOKEN, dataUser.token)
      localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
        'token': dataUser.token,
        'name': dataUser.name
      })).then(() => {
        checkUserIsAdmin(state, commit)
      }).catch(() => {
        console.log('Error setItem')
      })
    }
  },
  checkSession ({state, commit}) {
    localStorage.getItem(LocalStorageName.USER_DATA, (err, value) => {
      if (!err && value) {
        let data = JSON.parse(value)
        commit(types.SET_USER_IS_LOGGED, true)
        commit(types.SET_USER_IS_ADMIN, PasswordApi.verifyPassword(data.token, data.perm))
        commit(types.SET_USER_NAME, data.name)
        commit(types.SET_USER_TOKEN, data.token)
        if (!state.userData.userIsAdmin) {
          checkUserIsAdmin(state, commit)
        }
      } else {
        commit(types.SET_USER_IS_LOGGED, false)
      }
    })
  },
  getUsers ({state, commit}) {
    const userPromise = usersService.fetchUsers()
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

const checkUserIsAdmin = (state, commit) => {
  const settingsPromise = settingsApplicationService.settingsByNameOption('keyAdmin')
  settingsPromise.then((result) => {
    if (result.data) {
      Object.keys(result.data).forEach(function (key) {
        let currentKey = result.data[key].valueOption
        if (PasswordApi.verifyPassword(state.userData.tokenUser, currentKey)) {
          commit(types.SET_USER_IS_ADMIN, true)
          localStorage.removeItem(LocalStorageName.USER_DATA)
          localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
            'token': state.userData.tokenUser,
            'name': state.userData.nameUser,
            'perm': currentKey
          }))
        }
      })
    }
  })
}
