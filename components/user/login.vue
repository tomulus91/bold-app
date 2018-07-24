<template>
    <div class="content">
        <banner-top :textOnBanner="'Bold Intranet'" :imageBanner="this.banner" />
        <div class="content__panel">
            <content-home v-if="this.userIsLogged" />
            <form class="form-user" v-if="!this.userIsLogged && this.viewShow" @keyup.enter="submit" v-on:submit.prevent="submit">
                <headline :levelHeadline='"level2"' :headlineText='"Logowanie"' />
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
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import UserService from '@/assets/service/mongodb/users'
import PasswordApi from '@/plugins/PasswordApi'
import { mapState, mapActions } from 'vuex'
import ValidationError from '@/components/common/validation/ValidationError'
import BannerTop from '@/components/page/elements/content/bannerOnTop'
import ContentHome from '@/components/page/elements/content/contentHome'
import ButtonElements from '@/components/common/elements/button'
import Message from '@/components/common/message'
import Headline from '@/components/common/elements/headline'

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
    ContentHome,
    Headline
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

<style lang="scss" scoped>
    .form-user{
        width: 500px;
        margin: 0 auto;

        .label-form {
            display: block;
            width: 100%;
            font-weight: 300;
            color: #333;
        }

        .input-form {
            width: 100%;
            padding: 15px 20px;
            height: 48px;
            box-sizing: border-box;
            border:none;
            border-bottom: 1px solid #c5c6ca;
            margin-bottom: 40px;

            &:focus {
                outline: none;
                border-bottom: 1px solid #47494e;
            }
        }
    }
</style>
