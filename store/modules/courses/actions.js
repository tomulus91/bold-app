import { types } from './mutations'

export default {
  getCourses ({state, commit}) {
    commit(types.GET_ALL_COURSES)
  },
  getActiveCourse ({state, commit}, params) {
    commit(types.GET_ACTIVE_COURSE_FOR_USER, params.token)
  }
}
