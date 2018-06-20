<template>
    <div class="container">
        <div v-if="this.userIsLogged">
            <courses-index></courses-index>
        </div>
        <div v-else>
            Musisz się zalogowac
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import CoursesIndex from '../components/courses/'

export default {
  name: 'courses',
  components: {
    CoursesIndex
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged']
    })
  }
}
</script>
