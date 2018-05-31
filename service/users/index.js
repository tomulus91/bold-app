import Axios from '@/plugins/Axios'

export default {
  fetchUsers () {
    return Axios().get('users')
  },
  addUsers (params) {
    return Axios().post('add_users', params)
  },
  deleteUser (id) {
    return Axios().delete('users/' + id)
  },
  updateUser (params) {
    return Axios().put('update_user/' + params.id, params)
  },
  getUser (params) {
    return Axios().get('single_user/' + params.id)
  },
  userByLogin (params) {
    return Axios().get('login_user/' + params.login)
  }
}
