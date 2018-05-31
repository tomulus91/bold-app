import Axios from '@/plugins/Axios'

export default {
  fetchSettings () {
    return Axios().get('settings')
  },
  addSettings (params) {
    return Axios().post('add_settings', params)
  },
  deleteSettings (id) {
    return Axios().delete('settings/' + id)
  },
  updateSettings (params) {
    return Axios().put('update_settings/' + params.id, params)
  },
  settingsByKey (params) {
    return Axios().get('setting_by_key/' + params.settings)
  }
}