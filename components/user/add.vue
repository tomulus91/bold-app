<template>
    <div class="users" v-if="showAddUsersPanel">
        <h1>Dodaj nowego użytkownika</h1>
        <div class="form">
            <div>
                <input type="text" name="login" placeholder="Login użytkownika" v-model="login">
            </div>
            <div>
                <input type="text" name="name" placeholder="Imię i nazwisko użytkownika" v-model="name">
            </div>
            <div>
                <input type="text" name="email" placeholder="E-mail użytkownika" v-model="email">
            </div>
            <div>
                <input type="text" name="password" placeholder="Hasło użytkownika" v-model="password">
            </div>
            <div>
                <button class="app_post_btn" @click="addUsers">Dodaj</button><br /><br />
                <button class="app_post_btn" @click="exitAddUsers">Anuluj</button>
            </div>
        </div>
    </div>
    <div v-else>
        <button class="add_user_link" @click="showPanelAddUsers">Dodaj nowego użytkownika</button>
    </div>
</template>

<script>
    import UsersService from '@/plugins/UsersService'
    var randomstring = require("randomstring");

    export default {
        name: "UsersAdd",
        data () {
            return {
                login: '',
                name: '',
                email: '',
                password: '',
                token: randomstring.generate(),
                isAdmin: false,
                showAddUsersPanel: false
            }
        },
        methods: {
            showPanelAddUsers() {
                this.showAddUsersPanel = true;
                this.$emit('visibleAllUsersTable');
            },
            async addUsers () {
                await UsersService.addUsers({
                    login: this.login,
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    token: this.token,
                    isAdmin: this.isAdmin
                });
                this.$emit('visibleAllUsersTable');
                this.showAddUsersPanel = false;
            },
            exitAddUsers() {
                this.$emit('visibleAllUsersTable');
                this.showAddUsersPanel = false;
            }
        }
    }
</script>


<style scoped type="text/css">
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
    .add_user_link {
        background: #4d7ef7;
        color: #fff;
        padding: 10px 80px;
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        width: 520px;
        border: none;
        cursor: pointer;
        display: block;
        margin: 0 auto;
        margin-top: 20px;
    }
</style>