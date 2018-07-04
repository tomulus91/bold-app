import coursesService from '~/assets/service/courses'
import coursesServiceByUser from '~/assets/service/courses/courseByUser'

export const types = {
  SET_COURSES: 'SET_COURSES',
  SET_COURSES_SAVES_BY_TOKEN: 'SET_COURSES_SAVES_BY_TOKEN',
  SET_COURSES_FOR_USER: 'SET_COURSES_FOR_USER',
  SET_ALL_SAVES_COURSES: 'SET_ALL_SAVES_COURSES'
}

export const mutations = {
  [types.SET_COURSES] (state, dataCourses) {
      state.courses = dataCourses
  },
  [types.SET_COURSES_SAVES_BY_TOKEN] (state, dataCourseByToken) {
      state.allSaveCoursesByToken = dataCourseByToken
  },
  [types.SET_COURSES_FOR_USER] (state, dataCourseForSingleUser) {
      state.courseByUser = dataCourseForSingleUser
  },
  [types.SET_ALL_SAVES_COURSES] (state, dataAllSavesCourses) {
      state.allSaveCourses = dataAllSavesCourses
  }
}
