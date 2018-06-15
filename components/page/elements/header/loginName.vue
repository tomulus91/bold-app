<template>
    <div class="login-name">
        Zalogowany jako: {{this.nameUser}}
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'loginName',
  computed: {
    ...mapState('sessionUser', {
      nameUser: state => state.userData['nameUser']
    })
  }
}
</script>
