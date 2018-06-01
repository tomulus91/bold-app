<template>
    <div class="users" v-if="showAddUsersPanel">
        <h1>Dodaj nowego użytkownika</h1>
        <div class="form">
            <div>
                <input type="text" name="login" placeholder="Login użytkownika" v-model="login">
                <span v-show="errorLogin"
                      class="error-label">To pole jest wymagane oraz musi posiadać min. 6 znaków</span>
            </div>
            <div>
                <input type="text" name="name" placeholder="Imię i nazwisko użytkownika" v-model="name">
                <span v-show="errorName"
                      class="error-label">To pole jest wymagane oraz musi posiadać min. 6 znaków</span>
            </div>
            <div>
                <input type="text" name="email" placeholder="E-mail użytkownika" v-model="email">
                <span v-show="errorEmail" class="error-label">To pole jest puste lub email nie jest prawidłowy</span>
            </div>
            <div>
                <input type="text" name="password" placeholder="Hasło użytkownika" v-model="password">
                <span v-show="errorPassword" class="error-label">To pole jest puste lub ma mniej niż 8 znaków</span>
            </div>
            <div>
                <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
            </div>
            <div>
                <button class="button_btn" @click="validateAndAddUser">Dodaj</button>
                <button class="button_btn" @click="exitAddUsers">Anuluj</button>
            </div>
        </div>
    </div>
    <div v-else>
        <button class="button_btn button_btn-center" @click="showPanelAddUsers">Dodaj nowego użytkownika</button>
    </div>
</template>

<script>
import UsersService from '@/service/users'
import SettingsService from '@/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import debounce from 'debounce'

var randomstring = require('randomstring')

export default {
  name: 'UsersAdd',
  data () {
    return {
      login: '',
      name: '',
      email: '',
      password: '',
      token: randomstring.generate(),
      showAddUsersPanel: false,
      errorName: false,
      errorLogin: false,
      errorPassword: false,
      errorEmail: false,
      disableAddUser: true,
      errorForm: 0,
      userIsAdmin: false,
      id: ''
    }
  },
  watch: {
    login () {
      if (this.login.length >= 6) {
        this.errorLogin = false
      }
    },
    name () {
      if (this.name.length >= 6) {
        this.errorName = false
      }
    },
    email: debounce(function () {
      this.validateEmail(this.email)
    }, 300),
    password () {
      if (this.password.length >= 8) {
        this.errorPassword = false
      }
    }
  },
  methods: {
    async validateAndAddUser () {
      this.errorForm = 0
      if (this.login.length < 6) {
        this.errorLogin = true
        this.errorForm++
      }
      if (this.name.length < 6) {
        this.errorName = true
        this.errorForm++
      }

      if (this.password.length < 6) {
        this.errorPassword = true
        this.errorForm++
      }

      this.validateEmail(this.email)

      if (this.errorForm === 0) {
        this.addUsers()
      }
    },
    async validateEmail (email) {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!regex.test(String(email).toLowerCase())) {
        this.errorEmail = true
        this.errorForm++
      } else {
        this.errorEmail = false
      }
    },
    async showPanelAddUsers () {
      this.showAddUsersPanel = true
      this.$emit('visibleAllUsersTable')
    },
    async addUsers () {
      await UsersService.addUsers({
        login: this.login,
        name: this.name,
        email: this.email,
        password: PasswordApi.generatePassword(this.password),
        token: this.token
      }).then((result) => {
        this.id = result.data._id
      })
      if (this.userIsAdmin) {
        await SettingsService.addSettings({
          nameOptions: 'keyAdmin',
          valueOptions: PasswordApi.generatePassword(this.id)
        })
      }
      this.$emit('visibleAllUsersTable')
      this.showAddUsersPanel = false
    },
    async exitAddUsers () {
      this.$emit('visibleAllUsersTable')
      this.showAddUsersPanel = false
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

    .form input[type = 'checkbox'] {
        width: auto;
    }

    .form div {
        margin: 20px;
    }

    .button_btn-center {
        margin: 0 auto;
    }

    .button_btn {
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
        margin-top: 20px;
    }

    .button_btn:disabled {
        opacity: 0.2;
    }

    .error-label {
        display: block;
        color: red;
    }
</style>
