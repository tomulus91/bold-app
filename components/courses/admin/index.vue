<template>
    <div>
        <div v-if="coursesToAccept.length > 0 && !this.singleCourseView" class="table-wrap">
            <h1>{{ this.titleCourse }}</h1>
            <button @click="setShowTypeCourse('none')">Szkolenia do rozpatrzenia</button>
            <button @click="setShowTypeCourse('accept')">Zaakceptowane szkolenia</button>
            <button @click="setShowTypeCourse('discard')">Odrzucone szkolenia</button>
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
                        <a href="#" @click.prevent="showDetails(course._id, course.user, course.course)">Zobacz szczegóły</a>
                    </td>
                </tr>
            </table>
        </div>
        <h1 v-if="this.coursesToAccept.length === 0">Brak kursów do rozpatrzenia</h1>
        <courses-single @setDefaultView="setDefaultView" :params="paramsForSingleCourse" v-if="this.singleCourseView"></courses-single>
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
      singleCourseView: false,
      showTypeCourse: 0,
      titleCourse: 'Szkolenia do rozpatrzenia'
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
      return this.allSaveCourse.filter((index) => {
        return index.status === this.showTypeCourse
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
    setShowTypeCourse (type) {
      switch (type) {
        case 'none':
          this.showTypeCourse = 0
          this.titleCourse = 'Szkolenia do rozpatrzenia'
          break
        case 'accept':
          this.showTypeCourse = 1
          this.titleCourse = 'Zaakceptowane szkolenia'
          break
        case 'discard':
          this.showTypeCourse = -1
          this.titleCourse = 'Odrzucone szkolenia'
          break
        default:
          this.showTypeCourse = 0
          this.titleCourse = 'Szkolenia do rozpatrzenia'
      }
    },
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
    showDetails (idCourse, user, courseToken) {
      this.paramsForSingleCourse = {
        'idCourse': idCourse,
        'courseData': this.allCourses.filter(function (index) {
          return index.token === courseToken
        }),
        'saveCourse': this.allSaveCourse.filter(function (index) {
          return index._id === idCourse
        }),
        'user': this.allUsers.filter(function (index) {
          return index.token === user
        })
      }
      this.singleCourseView = true
    },
      setDefaultView () {
          this.singleCourseView = false
      }
  }
}
</script>
