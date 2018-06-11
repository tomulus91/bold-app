<template>
    <div>
        <h1>Dodaj nowego użytkownika</h1>
        <form class="add-user" v-on:submit.prevent="submit">
            <div class="input-wrapper">
                <div>
                    <label class="label-user">Login user</label>
                    <input class="input-user" v-validate="'required|min:6'" type="text" name="login"
                           placeholder="Write Your login"/>
                </div>
                <validation-error v-if="vErrors.has('login')" :errorMessage="vErrors.first('login')"/>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-user">Name user</label>
                    <input class="input-user" v-validate="'required|alpha|min:6'" type="text" name="name"
                           placeholder="Write Your Name"/>
                </div>
                <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-user">E-mail user</label>
                    <input class="input-user" v-validate="'required|email|min:6'" type="text" name="email"
                           placeholder="Write Your Email"/>
                </div>
                <validation-error v-if="vErrors.has('email')" :errorMessage="vErrors.first('email')"/>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-user">Password User</label>
                    <input class="input-user" v-validate="'required|min:6'" type="text" name="password"
                           placeholder="Write Your Password"/>
                </div>
                <validation-error v-if="vErrors.has('password')" :errorMessage="vErrors.first('password')"/>
            </div>
            <div>
                <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
            </div>
            <button class="add-question__submit btn--default" :class="{ active: isValidateAll }" type="submit">Add New
                User
            </button>
        </form>
        <div class="exit" @click="exit()">Exit add new user</div>
    </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapActions } from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
import usersService from '@/assets/service/users'
import settingsService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'

const randomstring = require('randomstring')

Vue.use(VeeValidate, {
  errorBagName: 'vErrors'
})

export default {
  name: 'UsersAdd',
  components: {
    ValidationError
  },
  data () {
    return {
      showAddUsersPanel: false,
      userIsAdmin: false
    }
  },
  computed: {
    isValidateAll () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  methods: {
    ...mapActions('sessionUser', [
      'getUsers'
    ]),
    exit () {
      this.$emit('setVisibleUserPanel')
    },
    submit (submitEvent) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const formInputs = submitEvent.target.elements
          const token = randomstring.generate()
          const dataToSend = {
            login: formInputs.login.value,
            name: formInputs.name.value,
            email: formInputs.email.value,
            password: PasswordApi.generatePassword(formInputs.password.value),
            token: token
          }
          usersService.addUsers(dataToSend).then(() => {
            if (this.userIsAdmin) {
              settingsService.addSettings({
                nameOption: 'keyAdmin',
                valueOption: PasswordApi.generatePassword(token)
              })
            }
            this.clearForm()
            this.getUsers({})
            this.exit()
          })
        }
      })
    },
    clearForm () {
      this.userIsAdmin = false
      this.$validator.reset()
    }
  }
}
</script>


<style scoped type="text/css">
    .input-wrapper {
        position: relative;
        margin-bottom: 10px;
        width: 300px;
    }
    .label-user{
        display: block;
    }
    .input-user {
        display: block;
    }
</style>
