<template>
    <form class="add-user" v-if="!this.userIsLogged" v-on:submit.prevent="submit">
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
                <label class="label-user">Password User</label>
                <input class="input-user" v-validate="'required|min:6'" type="password" name="password"
                       placeholder="Write Your Password"/>
            </div>
            <validation-error v-if="vErrors.has('password')" :errorMessage="vErrors.first('password')"/>
        </div>
        <div>
            <button class="app_post_btn">Zaloguj się</button>
            <br/> <br/>
        </div>
    </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import UserService from '@/assets/service/users'
import PasswordApi from '@/plugins/PasswordApi'
import { mapState, mapActions } from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
Vue.use(VeeValidate, {
  errorBagName: 'vErrors'
})
export default {
  name: 'loginUser',
  components: {
    ValidationError
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged']
    }),
    isValidateAll () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  methods: {
    ...mapActions('sessionUser', [
      'sessionForUser'
    ]),
    submit (submitEvent) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const formInputs = submitEvent.target.elements
          const login = formInputs.login.value
          const password = formInputs.password.value
          UserService.userByLogin(login).then((result) => {
            if (result.data) {
              if (PasswordApi.verifyPassword(password, result.data.password)) {
                this.sessionForUser(result.data)
              }
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
