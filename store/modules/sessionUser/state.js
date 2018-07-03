import {mutations} from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    userData: {
      userIsLogged: '',
      userIsAdmin: false,
      tokenUser: '',
      nameUser: ''
    },
    users: []
  },
  mutations,
  actions
}
