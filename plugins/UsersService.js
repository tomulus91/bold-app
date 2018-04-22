import Api from '@/plugins/Api'

export default {
    fetchUsers () {
        return Api().get('users')
    },
    addUsers (params) {
        return Api().post('add_users', params)
    },
    deleteUser (id) {
        return Api().delete('users/' + id)
    }
}