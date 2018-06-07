import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchUsers () {
    return axios.get(`${BASE_URL}users`)
  },
  addUsers (params) {
    return axios.post(`${BASE_URL}add-users`, params)
  },
  deleteUser (token) {
    return axios.post(`${BASE_URL}delete-users`, {
        params: {
            token: token
        }
    })
  },
  updateUser (params) {
    return axios.post(`${BASE_URL}update-user`, params)
  },
  getUser (token) {
    return axios.get(`${BASE_URL}single-user`, {
      params: {
        token: token
      }
    })
  },
  userByLogin (login) {
    return axios.get(`${BASE_URL}login-user`, {
        params: {
            login: login
        }
    })
  }
}
