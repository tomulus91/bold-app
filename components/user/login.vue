<template>
    <div class="posts">
        <div class="form" v-if="!this.userIsLogged">
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
        <button v-if="this.userIsLogged" class="app_post_btn" @click.prevent="logoutWithApplication">Wyloguj się</button>
    </div>
</template>

<script>
import UserService from '@/plugins/UsersService'
import PasswordApi from '@/plugins/PasswordApi'
import localStorage from '@/plugins/localforage'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'loginUser',
  data() {
    return {
      login: '',
      password: '',
      users: '',
      isLogin: false
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged']
    })
  },
  methods: {
    ...mapActions('sessionUser', [
      'sessionForUser'
    ]),
    loginToApplication () {
      if (this.login !== '' && this.password !== '') {
        UserService.userByLogin({
          login: this.login
        }).then((result) => {
          if (!!result.data) {
            if (PasswordApi.verifyPassword(this.password, result.data.password)) {
              this.sessionForUser(result.data)
            }
          }
        });
      }
    },
    logoutWithApplication () {
      this.sessionForUser({});
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