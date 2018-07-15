<template>
    <form class="form-add-user" v-on:submit.prevent="submit">
        <headline :levelHeadline='"level1"' :headlineText='"Dodaj nowego użytkownika"' />
        <div class="input-wrapper">
            <div>
                <label class="label-form">Login user</label>
                <validation-error v-if="vErrors.has('login')" :errorMessage="vErrors.first('login')"/>
                <input class="input-form" v-validate="'required|min:6'" type="text" name="login" />
            </div>
        </div>
        <div class="input-wrapper">
            <div>
                <label class="label-form">Name user</label>
                <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
                <input class="input-form" v-validate="'required|min:6'" type="text" name="name" />
            </div>
        </div>
        <div class="input-wrapper">
            <div>
                <label class="label-form">E-mail user</label>
                <validation-error v-if="vErrors.has('email')" :errorMessage="vErrors.first('email')"/>
                <input class="input-form" v-validate="'required|email|min:6'" type="text" name="email" />
            </div>
        </div>
        <div class="input-wrapper">
            <div>
                <label class="label-form">Password User</label>
                <validation-error v-if="vErrors.has('password')" :errorMessage="vErrors.first('password')"/>
                <input class="input-form" v-validate="'required|min:6'" type="text" name="password" />
            </div>
        </div>
        <div class="checkbox-admin">
            <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
        </div>
        <button-elements :buttonMessage="'Dodaj nowego użytkownika'" />
        <div class="exit-form" @click="exit(false)">Anuluj</div>
    </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { mapActions } from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
import usersService from '@/assets/service/users'
import settingsService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import ButtonElements from '@/components/common/elements/button'
import Headline from '@/components/common/elements/headline'

const randomstring = require('randomstring')

Vue.use(VeeValidate, {
  errorBagName: 'vErrors'
})

export default {
  name: 'UsersAdd',
  components: {
    ValidationError,
    ButtonElements,
    Headline
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
    exit (successAddUser) {
      this.$emit('setVisibleUserPanel', true, false, false, successAddUser)
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
            this.exit(true)
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
