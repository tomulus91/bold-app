<template>
    <div class="posts">
        <h1>Edit Post</h1>
        <div class="form">
            <form class="add-user" v-on:submit.prevent="submit">
                <div class="input-wrapper">
                    <div>
                        <label class="label-user">Login user</label>
                        <input class="input-user" v-validate="'required|min:6'" v-model="login" type="text" name="login"
                               placeholder="Write Your login"/>
                    </div>
                    <validation-error v-if="vErrors.has('login')" :errorMessage="vErrors.first('login')"/>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label class="label-user">Name user</label>
                        <input class="input-user" v-validate="'required|alpha|min:6'" v-model="name" type="text" name="name"
                               placeholder="Write Your Name"/>
                    </div>
                    <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label class="label-user">E-mail user</label>
                        <input class="input-user" v-validate="'required|email|min:6'" v-model="email" type="text" name="email"
                               placeholder="Write Your Email"/>
                    </div>
                    <validation-error v-if="vErrors.has('email')" :errorMessage="vErrors.first('email')"/>
                </div>
                <div>
                    <input type="checkbox" name="vehicle" v-model="userIsAdmin">Administrator aplikacji<br>
                </div>
                <button class="add-question__submit btn--default" :class="{ active: isValidateAll }" type="submit">
                    Update User
                </button>
            </form>
            <div>
                <div class="app_post_btn" @click="exit">Anuluj</div>
            </div>
        </div>
    </div>
</template>

<script>
import userService from '@/assets/service/users'
import settingsApplicationService from '@/assets/service/settingsApplication'
import PasswordApi from '@/plugins/PasswordApi'
import {mapActions} from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'

export default {
  name: 'EditUser',
  props: ['tokenUser'],
  components: {
    ValidationError
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
