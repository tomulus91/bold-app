import { types } from './mutations'
import coursesService from '~/assets/service/mongodb/courses'
import coursesServiceByUser from '~/assets/service/mongodb/courses/courseByUser'

export default {
  getCourses ({state, commit}) {
    const coursesPromise = coursesService.fetchCourses()
    coursesPromise
      .then(response => {
        if (response.data) {
          commit(types.SET_COURSES, response.data)
        }
      }).catch(e => {
        console.log(e)
      })
  },
  getAllCoursesByToken ({state, commit}, params) {
    const coursesPromise = coursesServiceByUser.fetchSaveCoursesByToken(params.token)
    coursesPromise
      .then(response => {
        if (response.data) {
          commit(types.SET_COURSES_SAVES_BY_TOKEN, response.data)
        }
      }).catch(e => {
        console.log(e)
      })
  },
  getActiveCourse ({state, commit}, params) {
    const coursesPromise = coursesServiceByUser.getActiveCourseForUser(params.token)
    coursesPromise
      .then(response => {
        if (response.data) {
          commit(types.SET_COURSES_FOR_USER, response.data)
        }
      }).catch(e => {
        console.log(e)
      })
  },
  getAllSaveCourses ({state, commit}) {
    const coursesPromise = coursesServiceByUser.fetch()
    coursesPromise
      .then(response => {
        if (response.data) {
          commit(types.SET_ALL_SAVES_COURSES, response.data)
        }
      }).catch(e => {
        console.log(e)
      })
  }
}
