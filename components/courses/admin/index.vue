<template>
    <div>
        <h1>Zarządzaj szkoleniami</h1>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'courseAdmin',
  computed: {
    ...mapState('courses', {
      allCourses: state => state.courses,
      //saveCourses: state => state.allSaveCourses
    })
  },
  mounted () {
    this.allCourses.length === 0 ? this.getCourses({}) : ''
    //this.saveCourses.length === 0 ? this.getSaveCourses({}) : ''
  },
  methods: {
    ...mapActions('courses', [
      'getCourses',
      'getSaveCourses'
    ])
  }
}
</script>
