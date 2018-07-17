<template>
    <div class="login-panel">
        <banner-top :textOnBanner="'Bold Intranet'" :imageBanner="this.banner"></banner-top>
        <content-home v-if="this.userIsLogged" />
        <div class="container" v-if="this.viewShow">
            <form class="form-login" v-if="!this.userIsLogged" @keyup.enter="submit" v-on:submit.prevent="submit">
                <h2 class="title-page">Logowanie</h2>
                <message v-if="this.errorLogin" :messageType="'error'" :messageText="'Błędny login/hasło'" />
                <div class="input-wrapper">
                    <div>
                        <label class="label-form">Login:</label>
                        <validation-error v-if="vErrors.has('login')" :errorMessage="vErrors.first('login')"/>
                        <input class="input-form" v-validate="'required|min:6'" type="text" name="login" />
                    </div>
                </div>
                <div class="input-wrapper">
                    <div>
                        <label class="label-form">Password: </label>
                        <validation-error v-if="vErrors.has('password')" :errorMessage="vErrors.first('password')"/>
                        <input class="input-form" v-validate="'required|min:6'" type="password" name="password" />
                    </div>
                </div>
                <div>
                    <button-elements :buttonMessage="'Zaloguj sie'" />
                    <br/> <br/>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserService from '@/assets/service/users'
import PasswordApi from '@/plugins/PasswordApi'
import { mapState, mapActions } from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
import BannerTop from '@/components/page/elements/content/bannerOnTop'
import ContentHome from '@/components/page/elements/content/contentHome'
import ButtonElements from '@/components/common/elements/button'
import Message from '@/components/common/message'

export default {
  name: 'loginUser',
  data () {
    return {
      errorLogin: false,
      banner: require('~/assets/image/bannerLogin.jpg'),
      viewShow: false
    }
  },
  components: {
    ValidationError,
    ButtonElements,
    Message,
    BannerTop,
    ContentHome
  },
  watch: {
    userIsLogged (value) {
      this.viewShow = !value
    }
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
              } else {
                this.errorLogin = true
              }
            } else {
              this.errorLogin = true
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
