import axios from 'axios'

const network = () => {
  return axios.create({
    baseURL: 'http://localhost:8082'
  })
}

export default {
  fetchSettings () {
    return network().get('settings')
  },
  addSettings (params) {
    return network().post('add_settings', params)
  },
  deleteSettings (id) {
    return network().delete('settings/' + id)
  },
  updateSettings (params) {
    return network().put('update_settings/' + params.id, params)
  },
  settingsByNameOption (params) {
    return network().get('setting_by_name_option/' + params)
  }
}
