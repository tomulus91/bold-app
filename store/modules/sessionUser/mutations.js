import localStorage from '@/plugins/localforage'
import SettingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'

export const types = {
  ADD_SESSION_LOGGED_USER: 'ADD_SESSION_LOGGED_USER',
  REMOVE_SESSION_LOGGED_USER: 'REMOVE_SESSION_LOGGED_USER',
  CHECK_SESSION_USER: 'CHECK_SESSION_USER',
  CHECK_USER_IS_ADMIN: 'CHECK_USER_IS_ADMIN'
}

const LocalStorageName = {
  USER_DATA: 'USER_DATA'
}

export const mutations = {
  [types.ADD_SESSION_LOGGED_USER] (state, dataUser) {
    state.userData = {
      userIsLogged: true,
      userIsAdmin: false,
      tokenUser: dataUser.token,
      idUser: dataUser._id
    }
    localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
      'token': state.userData.tokenUser,
      'id': state.userData.idUser
    })).ready().then(() => {
      //checkUserIsAdmin(state)
    }).catch(() => {
      console.log('Error setItem')
    })
  },
  [types.REMOVE_SESSION_LOGGED_USER] (state) {
    localStorage.removeItem(LocalStorageName.USER_DATA)
    state.userData = {
      userIsLogged: false,
      userIsAdmin: false,
      tokenUser: '',
      idUser: ''
    }
  },
  [types.CHECK_SESSION_USER] (state) {
    localStorage.getItem(LocalStorageName.USER_DATA, (err, value) => {
      if (!err) {
        let data = JSON.parse(value)
        state.userData = {
          userIsLogged: true,
          userIsAdmin: PasswordApi.verifyPassword(data.id, data.perm),
          tokenUser: data.token,
          idUser: data.id
        }
        if (!state.userData.userIsAdmin) {
          checkUserIsAdmin(state)
        }
      }
    })
  }
}

const checkUserIsAdmin = (state) => {
  SettingsApplicationService.settingsByNameOption(
    'keyAdmin'
  ).then((result) => {
    if (result.data) {
      Object.keys(result.data).forEach(function (key) {
        let currentKey = result.data[key].valueOptions
        if (PasswordApi.verifyPassword(state.userData.idUser, currentKey)) {
          state.userData.userIsAdmin = true
          localStorage.removeItem(LocalStorageName.USER_DATA)
          localStorage.setItem(LocalStorageName.USER_DATA, JSON.stringify({
            'token': state.userData.tokenUser,
            'id': state.userData.idUser,
            'perm': currentKey
          }))
        }
      })
    }
  })
}

