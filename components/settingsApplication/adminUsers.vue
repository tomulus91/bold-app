<template>
    <div>
        <div v-if="settingsData.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="setting in settingsData">
                    <td>{{ getName(setting.valueOption) }}</td>
                    <td align="center">
                        <a href="#" v-if="permCurrentAdmin !== setting.valueOption" @click.prevent="deleteAdminUser(setting.valueOption)">Delete</a>
                        <span v-else>Nie można usunąć, ponieważ jesteś na tym koncie</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script>
import PasswordApi from '@/plugins/PasswordApi'
import settingsApplicationService from '@/assets/service/mongodb/settingsApplication'
import { mapActions, mapState } from 'vuex'
import localStorage from '@/plugins/localforage'

export default {
  name: 'adminUsers',
  data () {
    return {
      settingsData: {},
      permCurrentAdmin: ''
    }
  },
  computed: {
    ...mapState('sessionUser', {
      allUsers: state => state.users
    })
  },
  mounted () {
    this.getSettingsData()
    this.allUsers.length === 0 ? this.getUsers({}) : ''
    this.getDataUserLogged()
  },
  methods: {
    ...mapActions('sessionUser', [
      'getUsers'
    ]),
    getDataUserLogged () {
      localStorage.getItem('USER_DATA', (err, value) => {
        let data = JSON.parse(value)
        this.permCurrentAdmin = data.perm
      })
    },
    deleteAdminUser (value) {
      const promiseRemove = settingsApplicationService.deleteSettings(value)
      promiseRemove.then((result) => {
        if (result.data) {
          this.getSettingsData()
        }
      })
    },
    getName (valueKey) {
      let name = ''
      this.allUsers.forEach((index) => {
        if (PasswordApi.verifyPassword(index.token, valueKey)) {
          name = index.name
        }
      })
      return name
    },
    getSettingsData () {
      const settingsPromise = settingsApplicationService.fetchSettings()
      settingsPromise.then((result) => {
        if (result.data) {
          this.settingsData = result.data.filter((index) => {
            return index.keyOption === 'keyAdmin'
          })
        }
      })
    }
  }
}
</script>
