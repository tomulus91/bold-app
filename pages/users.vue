<template>
    <div >
        <users-show></users-show>
    </div>
    <!--<div>-->
        <!--<p>Musisz posiadać prawa administratora aby móc zarządzać użytkownikami</p>-->
    <!--</div>-->
</template>

<script>
import UsersShow from '../components/user/show'
import {mapState} from 'vuex'

export default {
  name: 'users',
  components: {UsersShow},
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged'],
      userIsAdmin: state => state.userData['userIsAdmin']
    })
  }
}
</script>
