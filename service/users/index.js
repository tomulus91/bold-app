import axios from 'axios'

const network = () => {
  return axios.create({
    baseURL: 'http://localhost:8081'
  })
}

export default {
  fetchUsers () {
    return network().get('users')
  },
  addUsers (params) {
    return network().post('add_users', params)
  },
  deleteUser (id) {
    return network().delete('users/' + id)
  },
  updateUser (params) {
    return network().put('update_user/' + params.id, params)
  },
  getUser (params) {
    return network().get('single_user/' + params.id)
  },
  userByLogin (params) {
    return network().get('login_user/' + params.login)
  }
}
