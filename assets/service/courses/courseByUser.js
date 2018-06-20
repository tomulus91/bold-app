import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchCoursesForUser () {
    return axios.get(`${BASE_URL}courses-user`)
  },
  addCourseForUser (params) {
    return axios.post(`${BASE_URL}add-course-for-user`, params)
  }
}
