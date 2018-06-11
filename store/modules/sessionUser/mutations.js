import localStorage from '@/plugins/localforage'
import settingsApplicationService from '@/assets/service/settingsApplication'
import usersService from '~/assets/service/users'
import PasswordApi from '@/plugins/PasswordApi'

export const types = {
  ADD_SESSION_LOGGED_USER: 'ADD_SESSION_LOGGED_USER',
  REMOVE_SESSION_LOGGED_USER: 'REMOVE_SESSION_LOGGED_USER',
  CHECK_SESSION_USER: 'CHECK_SESSION_USER',
  CHECK_USER_IS_ADMIN: 'CHECK_USER_IS_ADMIN',
  GET_ALL_USERS: 'GET_ALL_USERS'
}

const LocalStorageName = {
  USER_DATA: 'USER_DATA'
}

export const mutations = {
  [types.ADD_SESSION_LOGGED_USER] (state, dataUser) {
    state.userData = {
      userIsLogged: true,
      userIsAdmin: false,
      tokenUser: dataUser.token
    }
    localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
      'token': state.userData.tokenUser
    })).then(() => {
      checkUserIsAdmin(state)
    }).catch(() => {
      console.log('Error setItem')
    })
  },
  [types.REMOVE_SESSION_LOGGED_USER] (state) {
    localStorage.removeItem(LocalStorageName.USER_DATA)
    state.userData = {
      userIsLogged: false,
      userIsAdmin: false,
      tokenUser: ''
    }
  },
  [types.CHECK_SESSION_USER] (state) {
    localStorage.getItem(LocalStorageName.USER_DATA, (err, value) => {
      if (!err && value) {
        let data = JSON.parse(value)
        state.userData = {
          userIsLogged: true,
          userIsAdmin: PasswordApi.verifyPassword(data.token, data.perm),
          tokenUser: data.token
        }
        if (!state.userData.userIsAdmin) {
          checkUserIsAdmin(state)
        }
      }
    })
  },
  [types.GET_ALL_USERS] (state) {
    const userPromise = usersService.fetchUsers()
    userPromise
      .then(response => {
        const data = response.data
        if (data.length > 0) {
          state.users = data
        }
      }).catch(e => {
        console.log(e)
      })
  }
}

const checkUserIsAdmin = (state) => {
  const settingsPromise = settingsApplicationService.settingsByNameOption('keyAdmin')
  settingsPromise.then((result) => {
    if (result.data) {
      Object.keys(result.data).forEach(function (key) {
        let currentKey = result.data[key].valueOption
        if (PasswordApi.verifyPassword(state.userData.tokenUser, currentKey)) {
          state.userData.userIsAdmin = true
          localStorage.removeItem(LocalStorageName.USER_DATA)
          localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
            'token': state.userData.tokenUser,
            'perm': currentKey
          }))
        }
      })
    }
  })
}

