<template>
    <div class="container">
        <div v-if="this.userIsLogged && this.showDefaultView">
            <h1>Szkolenia</h1>
            <message v-if="this.newCourseIsAddMessage" @removeMessage="removeMessage" :showCloseButton="true" :messageText="'Szkolenie zostało dodane'"></message>
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
                    <course-by-user></course-by-user>
                </div>
            </div>
        </div>
        <add-course @showDefaultCourseView="showDefaultCourseView" v-if="this.showAddCourse"></add-course>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import AllCourses from '@/components/courses/all'
import AddCourse from '@/components/courses/add'
import CourseByUser from '@/components/courses/courseByUser'
import Message from '@/components/common/message'

export default {
  name: 'courses',
  components: {
    AllCourses,
    AddCourse,
    Message,
    CourseByUser
  },
  data () {
    return {
      showAddCourse: false,
      showDefaultView: true,
      newCourseIsAddMessage: false
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
      this.showDefaultView = false
    },
    showDefaultCourseView (courseIsAdd) {
      this.showAddCourse = false
      this.showDefaultView = true
      this.newCourseIsAddMessage = courseIsAdd
    },
    removeMessage () {
      this.newCourseIsAddMessage = false
    }
  }
}
</script>
