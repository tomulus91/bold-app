<template>
    <div class="container">
        <div v-if="this.userIsLogged && this.showDefaultView">
            <h1 class="title-course">Szkolenia</h1>
            <button v-if="this.userIsAdmin" class="buttonForm buttonForm--add-course">
                <nuxt-link to="/admin/courses">Zarządzaj szkoleniami</nuxt-link>
            </button>
            <message v-if="this.newCourseIsAddMessage" @removeMessage="removeMessage" :showCloseButton="true" :messageText="'Szkolenie zostało dodane'"></message>
            <div class="courses">
                <div class="courses--left">
                    <h2>Dostępne szkolenia</h2>
                    <button class="buttonForm buttonForm--add-course" @click="showAddCoursePanel">
                        Dodaj nowe
                    </button>
                    <all-courses @showSingleCourse="showSingleCourse"></all-courses>
                </div>
                <div class="courses--right">
                    <h2>Twój budżet na szkolenia</h2>
                    <h2>Twoje szkolenia</h2>
                    <course-by-user @showSingleCourse="showSingleCourse"></course-by-user>
                </div>
            </div>
        </div>
        <add-course @showDefaultCourseView="showDefaultCourseView" v-if="this.showAddCourseView"></add-course>
        <single-course @showDefaultCourseView="showDefaultCourseView" v-if="this.showSingleCourseView" :tokenCourseCurrent="this.singleCourseToken"></single-course>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import AllCourses from '@/components/courses/all'
import AddCourse from '@/components/courses/add'
import CourseByUser from '@/components/courses/courseByUser'
import SingleCourse from '@/components/courses/courseSingle'
import Message from '@/components/common/message'

export default {
  name: 'courses',
  components: {
    AllCourses,
    AddCourse,
    Message,
    CourseByUser,
    SingleCourse
  },
  data () {
    return {
      showAddCourseView: false,
      showSingleCourseView: false,
      showDefaultView: true,
      newCourseIsAddMessage: false,
      singleCourseToken: ''
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged'],
      userIsAdmin: state => state.userData['userIsLogged']
    })
  },
  methods: {
    showAddCoursePanel () {
      this.showAddCourseView = true
      this.showDefaultView = false
    },
    showDefaultCourseView (courseIsAdd) {
      this.showAddCourseView = false
      this.showDefaultView = true
      this.showSingleCourseView = false
      if (courseIsAdd) {
        this.newCourseIsAddMessage = courseIsAdd
      }
    },
    removeMessage () {
      this.newCourseIsAddMessage = false
    },
    showSingleCourse (singleCourseToken) {
      this.singleCourseToken = singleCourseToken
      this.showDefaultView = false
      this.showSingleCourseView = true
    }
  }
}
</script>
