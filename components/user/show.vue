<template>
    <div class="users" v-if="this.userIsLogged && this.userIsAdmin">
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
                            <a href="#" @click.prevent="editUser(user._id)">Edit</a> |
                            <a href="#" @click.prevent="deleteUser(user._id)">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                Brak użytkowników w bazie <br/><br/>
            </div>
        </div>
        <users-add v-if="!showEditUserPanel" @visibleAllUsersTable="visibleAllUsersPanel"></users-add>
        <edit-user :idUser="idCurrentUser" @visibleAllUsersTable="visibleAllUsersPanel"
                   v-if="showEditUserPanel"></edit-user>
    </div>
    <div v-else>
        <h2>Brak uprawnien</h2>
    </div>
</template>

<script>
import UsersService from '@/service/users'
import UsersAdd from '@/components/user/add'
import EditUser from '@/components/user/edit'
import { mapState } from 'vuex'

export default {
  name: 'usersShow',
  components: {UsersAdd, EditUser},
  data () {
    return {
      users: [],
      showAllUsers: true,
      showEditUserPanel: false,
      idCurrentUser: ''
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged'],
      userIsAdmin: state => state.userData['userIsAdmin']
    })
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      let response = await UsersService.fetchUsers()
      this.users = response.data.users
    },
    visibleAllUsersPanel () {
      this.showAllUsers = !this.showAllUsers
      this.showEditUserPanel = false
      this.getUsers()
    },
    async deleteUser (id) {
      await UsersService.deleteUser(id)
      this.getUsers()
    },
    editUser (id) {
      this.idCurrentUser = id
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
