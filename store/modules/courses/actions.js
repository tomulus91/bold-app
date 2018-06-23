import { types } from './mutations'

export default {
  getCourses ({state, commit}) {
    commit(types.GET_ALL_COURSES)
  },
  getSaveCourses ({state, commit}, params) {
    commit(types.GET_ALL_SAVE_COURSE, params.token)
  },
  getActiveCourse ({state, commit}, params) {
    commit(types.GET_ACTIVE_COURSE_FOR_USER, params.token)
  }
}
