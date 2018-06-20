import coursesService from '~/assets/service/courses'

export const types = {
  GET_ALL_COURSES: 'GET_ALL_COURSES'
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
  }
}