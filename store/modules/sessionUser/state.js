import {mutations} from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    userData: {
      userIsLogged: false,
      userIsAdmin: false,
      tokenUser: '',
      nameUser: ''
    },
    users: []
  },
  mutations,
  actions
}
