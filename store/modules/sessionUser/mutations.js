import localStorage from '@/plugins/localforage'
import SettingsApplicationService from '@/service/settingsApplication'

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
    }))
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
    localStorage.getItem(LocalStorageName.USER_DATA).then((result) => {
      let data = JSON.parse(result)
      if (data) {
        state.userData = {
          userIsLogged: true,
          userIsAdmin: false,
          tokenUser: data.token,
          idUser: data.id
        }
      }
    })
  },
  [types.CHECK_USER_IS_ADMIN] (state) {
    console.log('2')
    SettingsApplicationService.settingsByNameOption(
      'keyAdmin'
    ).then((result) => {
      if (result.data) {
        Object.keys(result.data).forEach(function (key) {
          console.log(result.data[key].valueOptions)
        })
      }
    })
  }
}
