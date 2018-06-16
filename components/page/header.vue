<template>
    <div class="header">
        <div class="container">
            <logo-page></logo-page>
            <today-date></today-date>
            <div v-if="this.userIsLogged" class="container--logged">
                <name-user></name-user>
                <menu-page></menu-page>
            </div>
        </div>
    </div>
</template>

<script>
import MenuPage from '@/components/page/elements/header/menu'
import LogoPage from '@/components/page/elements/header/logo'
import todayDate from '@/components/page/elements/header/todayDate'
import nameUser from '@/components/page/elements/header/loginName'
import {mapState} from 'vuex'

export default {
  name: 'headerOnPage',
  components: {
    MenuPage,
    LogoPage,
    todayDate,
    nameUser
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged']
    })
  }
}
</script>
