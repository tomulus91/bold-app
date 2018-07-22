<template>
    <div class="container container__header">
        <div class="header-top">
            <logo-page></logo-page>
            <today-date></today-date>
            <div v-if="this.userIsLogged" class="header-top__logged">
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
<style lang="scss">
    .header-top {
        &__logo {
            float: left;
        }

        &__date {
            float: left;
            font: 600 12px/16px 'Open Sans', sans-serif;
            margin-left: 50px;
        }

        &__logged {
            float: right;

            &--login-name {
                float: left;
                font: 600 12px/30px 'Open Sans', sans-serif;
            }
        }
    }
</style>
