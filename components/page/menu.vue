<template>
    <div>
        <ul class="menu">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="this.userIsLogged && this.userIsAdmin">
                <nuxt-link to="/users">Użytkownicy</nuxt-link>
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
  name: 'EditUser',
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
    logoutWithApplication () {
      this.sessionForUser({})
    }
  }
}
</script>
