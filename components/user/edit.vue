<template>
    <div class="posts">
        <h1>Edit Post</h1>
        <div class="form">
            <div>
                <input type="text" name="login" placeholder="Login" v-model="login">
            </div>
            <div>
                <input type="text" name="name" placeholder="Imię i nazwisko" v-model="name">
            </div>
            <div>
                <input type="email" name="email" placeholder="E-mail uzytkownika" v-model="email">
            </div>
            <div>
                <input type="password" name="password" placeholder="Hasło" v-model="password">
            </div>

            <div>
                <button class="app_post_btn" @click="updateUser">Update</button><br /> <br />
                <button class="app_post_btn" @click="exitEditUserpanel">Anuluj</button>
            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '@/plugins/UsersService'
    export default {
        name: 'EditUser',
        props: ['idUser'],
        data () {
            return {
                login: '',
                name: '',
                email: '',
                password: ''
            }
        },
        mounted () {
            this.getPost()
        },
        methods: {
            async getPost () {
                const response = await UserService.getUser({
                    id: this.idUser
                });
                this.login = response.data.login;
                this.name = response.data.name;
                this.email = response.data.email;
                this.password = response.data.password;
            },
            async updateUser () {
                await UserService.updateUser({
                    id: this.idUser,
                    login: this.login,
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
                this.exitEditUserpanel();
            },
            async exitEditUserpanel() {
                this.$emit('visibleAllUsersTable');
            }
        }
    }
</script>
<style type="text/css">
    .form input, .form textarea {
        width: 500px;
        padding: 10px;
        border: 1px solid #e0dede;
        outline: none;
        font-size: 12px;
    }
    .form div {
        margin: 20px;
    }
    .app_post_btn {
        background: #4d7ef7;
        color: #fff;
        padding: 10px 80px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        width: 520px;
        border: none;
        cursor: pointer;
    }
</style>