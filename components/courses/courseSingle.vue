<template>
  <div class="course-single-page">
      <h2>{{this.tokenCourseCurrent}}</h2>
      <div class="exit-form" @click="exitSingleCourseView">Anuluj</div>
  </div>
</template>

<script>
export default {
  name: 'courseSingle',
  props: [
    'tokenCourseCurrent'
  ],
  methods: {
    exitSingleCourseView () {
      this.$emit('showDefaultCourseView')
    }
  }
}
</script>
