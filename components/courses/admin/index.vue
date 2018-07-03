<template>
    <div>
        <h1 @click="test">Zarządzaj szkoleniami</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'courseAdmin',
  computed: {
    ...mapState('courses', {
      allCourses: state => state.courses,
      allSaveCourse: state => state.allSaveCourses
    }),
    ...mapState('sessionUser', {
      allUsers: state => state.users
    })
  },
  mounted () {
    this.allCourses.length === 0 ? this.getCourses({}) : ''
    this.allSaveCourse.length === 0 ? this.getAllSaveCourses({}) : ''
    this.allUsers.length === 0 ? this.getUsers({}) : ''
  },
  methods: {
    ...mapActions('courses', [
      'getCourses',
      'getAllSaveCourses'
    ]),
    ...mapActions('sessionUser', [
      'getUsers'
    ]),
    test () {
      console.log(this.allCourses)
      console.log(this.allSaveCourse)
      console.log(this.allUsers)
    }
  }
}
</script>
