import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchCourses () {
    return axios.get(`${BASE_URL}courses`)
  },
  addCourse (params) {
    return axios.post(`${BASE_URL}add-course`, params)
  },
  deleteCourse (valueOption) {
    return axios.post(`${BASE_URL}remove-course`, {
      params: {
        valueOption: valueOption
      }
    })
  },
  updateCourse (params) {
    return axios.put(`${BASE_URL}update-course`, params.id, params)
  }
}
