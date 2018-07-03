<template>
    <div>
        <h1>Zarządzaj szkoleniami</h1>
        <div v-if="coursesToAccept.length > 0 && !this.singleCourseView" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa szkolenia</td>
                    <td>Data szkolenia</td>
                    <td>Pracownik</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="course in coursesToAccept">
                    <td>{{ course.name }}</td>
                    <td>{{ course.date }}</td>
                    <td>{{ getNameUser(course.user) }}</td>
                    <td align="center">
                        <a href="#" @click.prevent="showDetails(course._id)">Zobacz szczegóły</a>
                    </td>
                </tr>
            </table>
        </div>
        <courses-single :params="paramsForSingleCourse" v-if="this.singleCourseView"></courses-single>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CoursesSingle from './singleCourse'

export default {
  name: 'courseAdmin',
  components: {
    CoursesSingle
  },
  data () {
    return {
      allUsersArray: {},
      paramsForSingleCourse: {},
      singleCourseView: false
    }
  },
  computed: {
    ...mapState('courses', {
      allCourses: state => state.courses,
      allSaveCourse: state => state.allSaveCourses
    }),
    ...mapState('sessionUser', {
      allUsers: state => state.users
    }),
    coursesToAccept: function () {
      return this.allSaveCourse.filter(function (index) {
        return index.status === '0'
      })
    }
  },
  watch: {
    allUsers (userArray) {
      userArray.forEach((index) => {
        let token = index.token
        let name = index.name
        this.allUsersArray[token] = name
      })
    }
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
    getNameUser (idCourse) {
      let name = ''
      this.allUsers.forEach((index) => {
        if (index.token === idCourse) {
          name = index.name
          return false
        }
      })
      return name
    },
    showDetails (idCourse) {
      this.paramsForSingleCourse = {
        'idCourse': idCourse,
        'courses': this.allCourses,
        'saveCourses': this.allSaveCourse,
        'users': this.allUsers
      }
      this.singleCourseView = true
    }
  }
}
</script>
