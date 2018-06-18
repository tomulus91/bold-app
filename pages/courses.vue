<template>
    <div class="container">
        <div v-if="this.userIsLogged && this.showDefaultPanel">
            <h1>Szkolenia</h1>
            <div class="courses">
                <div class="courses--left">
                    <h2>Dostępne szkolenia</h2>
                    <button class="buttonForm buttonForm--add-course" @click="showAddCoursePanel">
                        Dodaj nowe
                    </button>
                    <all-courses></all-courses>
                </div>
                <div class="courses--right">
                    <h2>Twój budżet na szkolenia</h2>
                    <h2>Twoje szkolenia</h2>
                </div>
            </div>
        </div>
        <add-course v-if="this.showAddCourse"></add-course>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import AllCourses from '../components/courses/'
import AddCourse from '@/components/courses/add'

export default {
  name: 'courses',
  components: {
    AllCourses,
    AddCourse
  },
  data () {
    return {
      showAddCourse: false,
      showDefaultPanel: true
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged']
    })
  },
  methods: {
    showAddCoursePanel () {
      this.showAddCourse = true
      this.showDefaultPanel = false
    }
  }
}
</script>
