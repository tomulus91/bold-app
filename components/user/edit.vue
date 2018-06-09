<template>
    <div class="posts">
        <h1>Edit Post</h1>
        <div class="form">
            <div>
                <label>Login:</label><br/>
                <input type="text" name="login" placeholder="Login" v-model="login">
            </div>
            <div>
                <label>Imię i nazwisko:</label><br/>
                <input type="text" name="name" placeholder="Imię i nazwisko" v-model="name">
            </div>
            <div>
                <label>E-mail:</label><br/>
                <input type="email" name="email" placeholder="E-mail uzytkownika" v-model="email">
            </div>
            <div>
                <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
            </div>
            <div>
                <button class="app_post_btn" @click="updateUser">Aktualizuj</button>
                <br/> <br/>
                <button class="app_post_btn" @click="exitEditUserpanel">Anuluj</button>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/assets/service/users'
import settingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'

export default {
  name: 'EditUser',
  props: ['tokenUser'],
  data () {
    return {
      login: '',
      name: '',
      email: '',
      token: '',
      userIsAdmin: false,
      beginValueUserIsAdmin: false
    }
  },
  mounted () {
    this.getPost()
  },
  methods: {
    async getPost () {
      await userService.getUser(this.tokenUser)
        .then((response) => {
          this.login = response.data.login
          this.name = response.data.name
          this.email = response.data.email
          this.token = response.data.token
        }).then(() => {
          const settingPromise = settingsApplicationService.settingsByNameOption('keyAdmin')
          settingPromise.then((response) => {
            if (response.data) {
              Object.keys(response.data).forEach((key) => {
                const currentValueOption = response.data[key].valueOption
                if (PasswordApi.verifyPassword(this.token, currentValueOption)) {
                  this.userIsAdmin = true
                  this.beginValueUserIsAdmin = true
                }
              })
            }
          })
        })
    },
    async updateUser () {
      await userService.updateUser({
        token: this.tokenUser,
        login: this.login,
        name: this.name,
        email: this.email
      }).then(() => {
        if (!this.userIsAdmin && this.beginValueUserIsAdmin) {
          const settingPromise = settingsApplicationService.settingsByNameOption('keyAdmin')
          settingPromise.then((response) => {
            if (response.data) {
              Object.keys(response.data).forEach((key) => {
                const currentValueOption = response.data[key].valueOption
                if (PasswordApi.verifyPassword(this.token, currentValueOption)) {
                  settingsApplicationService.deleteSettings(currentValueOption)
                }
              })
            }
          })
        }
        if (this.userIsAdmin && !this.beginValueUserIsAdmin) {
          settingsApplicationService.addSettings({
            nameOption: 'keyAdmin',
            valueOption: PasswordApi.generatePassword(this.token)
          })
        }
      }).then(() => {
        this.exitEditUserpanel()
      })
    },
    async exitEditUserpanel () {
      this.$emit('visibleAllUsersTable')
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

    .form input[type = 'checkbox'] {
        width: auto;
    }
</style>
