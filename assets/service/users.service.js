import settingsApplicationService from '@/assets/service/mongodb/settingsApplication'
import localStorage from '@/plugins/localforage'
import PasswordApi from '@/plugins/PasswordApi'

const LocalStorageName = {
  USER_DATA: 'USER_DATA'
}

export default {
  checkUserIsAdmin (state) {
    return new Promise((resolve) => {
      this.getLocalStorageForUsers().then(response => {
        if (response.hasOwnProperty('perm')) {
          resolve({userIsAdmin: PasswordApi.verifyPassword(state.userData.tokenUser, response.perm)})
        } else {
          const settingsPromise = settingsApplicationService.userIsAdmin('keyAdmin', state.userData.tokenUser)
          settingsPromise.then((result) => {
            if (result.data.tokenAdmin !== 0) {
              this.removeLocalStorageForUsers()
              this.addLocalStorageForUsers({
                'token': state.userData.tokenUser,
                'name': state.userData.nameUser,
                'perm': result.data.tokenAdmin
              })
              resolve({userIsAdmin: true})
            } else {
              resolve({userIsAdmin: false})
            }
          })
        }
      })
    })
  },
  addLocalStorageForUsers (data) {
    return new Promise((resolve) => {
      let dataStorage = {
        'token': data.token,
        'name': data.name
      }
      if (data.hasOwnProperty('perm')) {
        dataStorage.perm = data.perm
      }
      dataStorage = JSON.stringify(dataStorage)
      localStorage.setItem(LocalStorageName.USER_DATA, dataStorage)
      resolve({addLocalStorage: true})
    })
  },
  getLocalStorageForUsers () {
    return new Promise((resolve) => {
      localStorage.getItem(LocalStorageName.USER_DATA, (err, value) => {
        if (!err && value) {
          resolve(JSON.parse(value))
        } else {
          resolve(false)
        }
      })
    })
  },
  removeLocalStorageForUsers () {
    localStorage.removeItem(LocalStorageName.USER_DATA)
  }
}
