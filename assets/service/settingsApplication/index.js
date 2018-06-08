import axios from 'axios'
import { BASE_URL } from '../api.config'

export default {
  fetchSettings () {
    return axios.get(`${BASE_URL}settings`)
  },
  addSettings (params) {
    return axios.post(`${BASE_URL}add-setting`, params)
  },
  deleteSettings (valueOption) {
    return axios.post(`${BASE_URL}remove-setting`, {
      params: {
        valueOption: valueOption
      }
    })
  },
  updateSettings (params) {
    return axios.put(`${BASE_URL}update-settings`, params.id, params)
  },
  settingsByNameOption (nameOption) {
    return axios.get(`${BASE_URL}setting-by-name-option`, {
      params: {
        nameOption: nameOption
      }
    })
  }
}
