<template>
    <div class="posts">
        <div class="form">
            <div>
                <label>Login</label><br/>
                <input type="text" name="login" placeholder="Login" v-model="login">
            </div>
            <div>
                <label>Password</label><br/>
                <input type="password" name="password" placeholder="Password" v-model="password">
            </div>
            <div>
                <button class="app_post_btn" @click.prevent="loginToApplication">Zaloguj się</button>
                <br/> <br/>
            </div>
        </div>
    </div>
</template>

<script>
    import UserService from '@/plugins/UsersService';
    import PasswordApi from '@/plugins/PasswordApi';

    export default {
        name: "loginUser",
        data() {
            return {
                login: '',
                password: '',
                users: ''
            }
        },
        methods: {
            loginToApplication() {
                UserService.userByLogin({
                    login: this.login
                }).then((result) => {
                    if (!!result.data) {
                        console.log(PasswordApi.verifyPassword(this.password, result.data.password))
                    }
                });

                // if (typeof response.data === 'object') {
                //     console.log(this.password);
                //     console.log(response);
                // }

                // if (response.data.hasOwnProperty('password')) {
                //     console.log(response.data.password);
                // }
                //console.log(PasswordApi.verifyPassword(this.password, response.data.password));
            }
        }
    }
</script>

<style scoped>
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