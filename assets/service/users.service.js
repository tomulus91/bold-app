import settingsApplicationService from '@/assets/service/mongodb/settingsApplication'
import localStorage from '@/plugins/localforage'

const LocalStorageName = {
  USER_DATA: 'USER_DATA'
}

export default {
  checkUserIsAdmin (state, commit) {
    console.log('CHEC')
    const settingsPromise = settingsApplicationService.userIsAdmin('keyAdmin', state.userData.tokenUser)
    settingsPromise.then((result) => {
      console.log(result.data.tokenAdmin)
      if (result.data.tokenAdmin !== 0) {
        this.removeLocalStorageForUsers()
        this.addLocalStorageForUsers({
          'token': state.userData.tokenUser,
          'name': state.userData.nameUser,
          'perm': result.data.tokenAdmin
        })
        this.$store.dispatch('sessionUser/setAdminUser')
      }
    })
  },
  addLocalStorageForUsers (data) {
    return new Promise(() => {
      let dataStorage = {
        'token': data.token,
        'name': data.name
      }
      if (data.hasOwnProperty('perm')) {
        dataStorage.perm = data.perm
      }
      dataStorage = JSON.stringify(dataStorage)
      localStorage.setItem(LocalStorageName.USER_DATA, dataStorage)
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
