import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchUsers () {
    return axios.get(`${BASE_URL}users`)
  },
  addUsers (params) {
    return axios.post(`${BASE_URL}add-users`, params)
  },
  deleteUser (id) {
    return axios.delete(`${BASE_URL}users/${id}`)
  },
  updateUser (params) {
    return axios.put(`${BASE_URL}update_user/${params}`)
  },
  getUser (params) {
    return axios.get(`${BASE_URL}single_user/${params.id}`)
  },
  userByLogin (params) {
    return axios.get(`${BASE_URL}login_user/${params.login}`)
  }
}
