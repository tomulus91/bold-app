<template>
    <div class="menu-container">
        <img src="~/assets/image/menu.svg" class="menu-container--icon" @click="showMenuBlock" />
        <ul class="menu-container--block" v-show="this.showMenu">
            <li v-if="this.userIsLogged" @click="hideMenuBlock">
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="this.userIsLogged" @click="hideMenuBlock">
                <nuxt-link to="/courses">Szkolenia</nuxt-link>
            </li>
            <li v-if="this.userIsLogged && this.userIsAdmin" @click="hideMenuBlock">
                <nuxt-link to="/admin/users">Użytkownicy</nuxt-link>
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
