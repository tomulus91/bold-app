import coursesService from '~/assets/service/courses'
import coursesServiceByUser from '~/assets/service/courses/courseByUser'

export const types = {
  GET_ALL_COURSES: 'GET_ALL_COURSES',
  GET_ALL_SAVE_COURSE_BY_TOKEN: 'GET_ALL_SAVE_COURSE_BY_TOKEN',
  GET_ACTIVE_COURSE_FOR_USER: 'GET_ACTIVE_COURSE_FOR_USER'
}

export const mutations = {
  [types.GET_ALL_COURSES] (state) {
    const coursesPromise = coursesService.fetchCourses()
    coursesPromise
      .then(response => {
        const data = response.data
        if (data.length > 0) {
          state.courses = data
        }
      }).catch(e => {
        console.log(e)
      })
  },
  [types.GET_ALL_SAVE_COURSE_BY_TOKEN] (state, courseToken) {
    const coursesPromise = coursesServiceByUser.fetchSaveCourses(courseToken)
    coursesPromise
      .then(response => {
        const data = response.data
        if (data.length > 0) {
          state.allSaveCoursesByToken = data
        }
      }).catch(e => {
        console.log(e)
      })
  },
  [types.GET_ACTIVE_COURSE_FOR_USER] (state, userToken) {
    const coursesPromise = coursesServiceByUser.getActiveCourseForUser(userToken)
    coursesPromise
      .then(response => {
        const data = response.data
        if (data.length > 0) {
          state.courseByUser = data
        }
      }).catch(e => {
        console.log(e)
      })
  }
}
