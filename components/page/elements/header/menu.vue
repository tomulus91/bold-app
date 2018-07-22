<template>
    <div class="header-top__menu">
        <img src="~/assets/image/menu.svg" class="header-top__menu--icon" @click="showMenuBlock" />
        <ul class="header-top__menu--block" v-show="this.showMenu">
            <li v-if="this.userIsLogged" @click="hideMenuBlock">
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="this.userIsLogged" @click="hideMenuBlock">
                <nuxt-link to="/courses">Szkolenia</nuxt-link>
            </li>
            <li v-if="this.userIsLogged && this.userIsAdmin" @click="hideMenuBlock">
                <nuxt-link to="/admin/users">Użytkownicy</nuxt-link>
            </li>
            <li v-if="this.userIsLogged && this.userIsAdmin" @click="hideMenuBlock">
                <nuxt-link to="/admin/settingApplication">Ustawienia</nuxt-link>
            </li>
            <li v-if="this.userIsLogged">
                <a href="#" @click.prevent="logoutWithApplication">Wyloguj się</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'menuOnPage',
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged'],
      userIsAdmin: state => state.userData['userIsAdmin']
    })
  },
  methods: {
    ...mapActions('sessionUser', [
      'sessionForUser'
    ]),
    showMenuBlock () {
      this.showMenu = !this.showMenu
    },
    hideMenuBlock () {
      this.showMenu = false
    },
    logoutWithApplication () {
      this.sessionForUser({}).then(() => {
        this.$nuxt.$router.replace({ path: '/' })
      })
    }
  }
}
</script>
<style lang="scss">
    .header-top__menu {
        float: left;
        margin-left: 50px;
        position: relative;

        &--icon {
            height: 30px;
            cursor: pointer;
        }

        &--block {
            position: absolute;
            list-style-type: none;
            padding: 0;
            z-index: 1;
            background: #ffdb09;
            margin: 0;
            top: 35px;
            right: 0;

            li {
                border-bottom: 1px solid #efc14e;

                &:last-child {
                    border-bottom: none;
                }

                a {
                    text-decoration: none;
                    color: #000000;
                    text-transform: uppercase;
                    font-weight: 600;
                    font-size: 12px;
                    padding: 10px 40px;
                    display: block;
                    letter-spacing: 2px;

                    &:hover, &.nuxt-link-exact-active {
                        background: #000000;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
</style>
