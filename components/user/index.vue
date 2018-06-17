<template>
    <div class="users">
        <div v-if="flags.showAllUsers">
            <div class="users-panel-top">
                <h1 class="title-user-panel">Zarządzaj pracownikami</h1>
                <button class="buttonForm buttonForm--add-user" @click="setVisibleUserPanel(false, false, true)">
                    Dodaj nowego
                </button>
            </div>
            <message v-if="this.flags.addUserMessage" @removeMessage="removeMessage" :showCloseButton="true" :messageText="'Pracownik został dodany'"></message>
            <message v-if="this.flags.removeUserMessage" @removeMessage="removeMessage" :showCloseButton="true" :messageType="'error'" :messageText="'Pracownik został usunięty'"></message>
            <div v-if="users.length > 0" class="table-wrap">
                <table>
                    <tr>
                        <td>Login</td>
                        <td >Imię / Nazwisko</td>
                        <td>Email</td>
                        <td>Opcje</td>
                    </tr>
                    <tr v-for="user in users">
                        <td>{{ user.login }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td align="center">
                            <a href="#" @click.prevent="editUser(user.token)">Edit</a> |
                            <a href="#" @click.prevent="deleteUser(user.token)">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                Brak użytkowników w bazie <br/><br/>
            </div>
        </div>
        <users-add v-if="flags.addSingleUser" @setVisibleUserPanel="setVisibleUserPanel"></users-add>
        <edit-user :tokenUser="tokenCurrentUser" @setVisibleUserPanel="setVisibleUserPanel"
                   v-if="flags.editSingleUser"></edit-user>
    </div>
</template>

<script>
import usersService from '~/assets/service/users'
import UsersAdd from '@/components/user/add'
import EditUser from '@/components/user/edit'
import settingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import {mapState, mapActions} from 'vuex'
import Message from '@/components/common/message'

export default {
  name: 'usersShow',
  components: {UsersAdd, EditUser, Message},
  data () {
    return {
      showAllUsers: true,
      showEditUserPanel: false,
      tokenCurrentUser: '',
      flags: {
        showAllUsers: true,
        editSingleUser: false,
        addSingleUser: false,
        addUserMessage: false,
        removeUserMessage: false
      }
    }
  },
  computed: {
    ...mapState('sessionUser', {
      users: state => state.users
    })
  },
  mounted () {
    this.getUsers({})
  },
  methods: {
    ...mapActions('sessionUser', [
      'getUsers'
    ]),
    removeMessage (type) {
      type === 'error' ? this.flags.removeUserMessage = false : this.flags.addUserMessage = false
    },
    setVisibleUserPanel (showAllUsers, editSingleUser, addSingleUser, successAddNewUser) {
      this.flags.showAllUsers = showAllUsers !== undefined ? showAllUsers : true
      this.flags.editSingleUser = editSingleUser !== undefined ? editSingleUser : false
      this.flags.addSingleUser = addSingleUser !== undefined ? addSingleUser : false
      if (successAddNewUser !== undefined && successAddNewUser) {
        this.flags.addUserMessage = true
      }
    },
    async deleteUser (token) {
      const settingPromise = settingsApplicationService.settingsByNameOption('keyAdmin')
      settingPromise.then((response) => {
        if (response.data) {
          Object.keys(response.data).forEach(function (key) {
            const currentValueOption = response.data[key].valueOption
            if (PasswordApi.verifyPassword(token, currentValueOption)) {
              settingsApplicationService.deleteSettings(currentValueOption)
            }
          })
        }
      }).then(() => {
        const userPromise = usersService.deleteUser(token)
        userPromise.then(() => {
          this.getUsers({})
          this.flags.removeUserMessage = true
        })
      })
    },
    editUser (token) {
      this.tokenCurrentUser = token
      this.setVisibleUserPanel(false, true, false)
    }
  }
}
</script>
