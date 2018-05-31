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
                            <a href="#" @click.prevent="editUser(user._id)">Edit</a> |
                            <a href="#" @click.prevent="deleteUser(user._id)">Delete</a>
                        </td>
                    </tr>
                </table>
            </div>
            <div v-else>
                Brak użytkowników w bazie <br /><br />
            </div>
        </div>
        <users-add v-if="!showEditUserPanel" @visibleAllUsersTable="visibleAllUsersPanel"></users-add>
        <edit-user :idUser="idCurrentUser" @visibleAllUsersTable="visibleAllUsersPanel" v-if="showEditUserPanel"></edit-user>
    </div>
</template>

<script>
    import UsersService from '@/service/users';
    import UsersAdd from "@/components/user/add";
    import EditUser from "@/components/user/edit";

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
        mounted () {
            this.getPosts();
        },
        methods: {
            async getPosts () {
                const response = await UsersService.fetchUsers();
                this.users = response.data.users
            },
            visibleAllUsersPanel() {
                this.showAllUsers = !this.showAllUsers;
                this.showEditUserPanel = false;
                this.getPosts();
            },
            async deleteUser (id) {
                await UsersService.deleteUser(id);
                this.getPosts();
            },
            editUser(id) {
                this.idCurrentUser = id;
                this.showEditUserPanel = true;
                this.showAllUsers = false;
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
    a.add_user_link {
        background: #4d7ef7;
        color: #fff;
        padding: 10px 80px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        display: block;
        margin: 0 auto;
    }
</style>