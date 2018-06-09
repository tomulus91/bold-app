<template>
    <div class="users">
        <div v-if="showAllUsers">
            <h1>Baza użytkowników</h1>
            <div v-if="users.length > 0" class="table-wrap">
                <table>
                    <tr>
                        <td>Login</td>
                        <td width="550">Imię i nazwisko</td>
                        <td width="550">Email</td>
                        <td width="100" align="center">Opcje</td>
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
        <users-add v-if="!showEditUserPanel" @visibleAllUsersTable="visibleAllUsersPanel"></users-add>
        <edit-user :tokenUser="tokenCurrentUser" @visibleAllUsersTable="visibleAllUsersPanel"
                   v-if="showEditUserPanel"></edit-user>
    </div>
</template>

<script>
import usersService from '~/assets/service/users'
import UsersAdd from '@/components/user/add'
import EditUser from '@/components/user/edit'
import settingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'usersShow',
  components: {UsersAdd, EditUser},
  data () {
    return {
      showAllUsers: true,
      showEditUserPanel: false,
      tokenCurrentUser: ''
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
    visibleAllUsersPanel () {
      this.showAllUsers = !this.showAllUsers
      this.showEditUserPanel = false
      this.getUsers()
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
          this.getUsers()
        })
      })
    },
    editUser (token) {
      this.tokenCurrentUser = token
      this.showEditUserPanel = true
      this.showAllUsers = false
    }
  }
}
</script>
<style type="text/css">
    .table-wrap {
        width: 60%;
        margin: 0 auto;
        text-align: center;
    }

    table th, table tr {
        text-align: left;
    }

    table thead {
        background: #f2f2f2;
    }

    table tr td {
        padding: 10px;
    }

    table tr:nth-child(odd) {
        background: #f2f2f2;
    }

    table tr:nth-child(1) {
        background: #4d7ef7;
        color: #fff;
    }

    a {
        color: #4d7ef7;
        text-decoration: none;
    }
</style>
