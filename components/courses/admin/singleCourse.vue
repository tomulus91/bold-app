<template>
    <div>
        <h1>{{ this.courseData.name }}</h1>
    </div>
</template>

<script>
export default {
  name: 'singleCourse',
  props: [
    'params'
  ],
  data () {
    return {
      courseData: {}
    }
  },
  mounted () {
    this.setCourseData()
  },
  methods: {
    setCourseData () {
      this.params.saveCourses.forEach((saveCourse) => {
        if (saveCourse._id === this.params.idCourse) {
          this.courseData.id = saveCourse._id
          this.params.users.forEach((user) => {
            if (user.token === saveCourse.user) {
              this.courseData.nameUser = user.name
              this.courseData.tokenUser = user.token
              return false
            }
          })
          this.params.courses.forEach((course) => {
            if (course.token === saveCourse.course) {
              this.courseData.address = course.address
              this.courseData.duration = course.duration
              this.courseData.begin = course.begin
              this.courseData.price = course.price
              this.courseData.link = course.link
              this.courseData.name = course.name
              this.courseData.information = course.information
              return false
            }
          })
          return false
        }
      })
      console.log(this.courseData)
    }
  }
}
</script>
