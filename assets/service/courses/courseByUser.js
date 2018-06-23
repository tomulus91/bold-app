import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchSaveCourses (tokenCourse) {
    return axios.get(`${BASE_URL}courses-save-user`, {
      params: {
        tokenCourse: tokenCourse
      }
    })
  },
  addCourseForUser (params) {
    return axios.post(`${BASE_URL}add-course-for-user`, params)
  },
  getActiveCourseForUser (tokenUser) {
    return axios.get(`${BASE_URL}get-active-course-for-user`, {
      params: {
        tokenUser: tokenUser
      }
    })
  }
}
