import {mutations} from './mutations'
import actions from './actions'

export default {
  namespaced: true,
  state: {
    courses: [],
    courseByUser: []
  },
  mutations,
  actions
}
