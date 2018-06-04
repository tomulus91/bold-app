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
  deleteSettings (params) {
    return network().delete('remove_settings/' + params)
  },
  updateSettings (params) {
    return network().put('update_settings/' + params.id, params)
  },
  settingsByNameOption (params) {
    return network().get('setting_by_name_option/' + params)
  }
}
