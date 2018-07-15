<template>
    <form class="form-edit-user" v-on:submit.prevent="submit">
        <headline :levelHeadline='"level1"' :headlineText='"Edytuj dane pracownika"' />
        <div class="input-wrapper">
            <div>
                <label class="label-form">Login user</label>
                <validation-error v-if="vErrors.has('login')" :errorMessage="vErrors.first('login')"/>
                <input class="input-form" v-validate="'required|min:6'" v-model="login" type="text" name="login"
                       placeholder="Write Your login"/>
            </div>
        </div>
        <div class="input-wrapper">
            <div>
                <label class="label-form">Name user</label>
                <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
                <input class="input-form" v-validate="'required|min:6'" v-model="name" type="text" name="name"
                       placeholder="Write Your Name"/>
            </div>
        </div>
        <div class="input-wrapper">
            <div>
                <label class="label-form">E-mail user</label>
                <validation-error v-if="vErrors.has('email')" :errorMessage="vErrors.first('email')"/>
                <input class="input-form" v-validate="'required|email|min:6'" v-model="email" type="text" name="email"
                       placeholder="Write Your Email"/>
            </div>
        </div>
        <div class="checkbox-admin">
            <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
        </div>
        <button-elements :buttonMessage="'Aktualizuj dane'" />
        <div class="exit-form" @click="exit">Anuluj</div>
    </form>
</template>

<script>
import userService from '@/assets/service/users'
import settingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import {mapActions} from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
import ButtonElements from '@/components/common/elements/button'
import Headline from '@/components/common/elements/headline'

export default {
  name: 'EditUser',
  props: ['tokenUser'],
  components: {
    ValidationError,
    ButtonElements,
    Headline
  },
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
  computed: {
    isValidateAll () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  methods: {
    ...mapActions('sessionUser', [
      'getUsers'
    ]),
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          userService.updateUser({
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
            this.getUsers({})
            this.exit()
          })
        }
      })
    },
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
    async exit () {
      this.$emit('setVisibleUserPanel')
    }
  }
}
</script>
<style type="text/css">

</style>
