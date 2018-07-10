import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetch () {
    return axios.get(`${BASE_URL}courses-save`)
  },
  fetchSaveCoursesByToken (tokenCourse) {
    return axios.get(`${BASE_URL}courses-save-user-by-token`, {
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
  },
  updateStatusCourse (params) {
    return axios.post(`${BASE_URL}update-save-course`, params)
  },
  deleteSaveCourse (token) {
    return axios.post(`${BASE_URL}remove-save-course`, {
      params: {
        token: token
      }
    })
  },
}
