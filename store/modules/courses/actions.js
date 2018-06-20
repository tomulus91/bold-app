import { types } from './mutations'

export default {
  getCourses ({state, commit}) {
    commit(types.GET_ALL_COURSES)
  }
}