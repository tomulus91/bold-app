<template>
    <div class="course-single-page">
        <h2>{{this.singleCourse.name}}</h2>
        <div class="exit-form" @click="exitSingleCourseView">Anuluj</div>
        <div @click="addToCourse" v-if="showAddToCourseButton">Dodaj mnie do tego kursu</div>
        <div @click="removeToCourse" v-if="!showAddToCourseButton">Usuń mnie z tego kursu</div>
        {{this.singleCourse.address}}<br />
        {{this.singleCourse.link}}<br />
        {{this.singleCourse.type}}<br />
        {{this.singleCourse.price}}<br />
        {{this.singleCourse.information}}<br />
        {{this.singleCourse.begin}}<br />
        {{this.singleCourse.duration}}<br />

        Zapisani do kursu: <br/>
        <table>
            <tr v-for="nameUser in usersNameInCourse">
                <td>{{ nameUser }}</td>
            </tr>
        </table>

    </div>
</template>

<script>
const moment = require('moment')
import {mapState, mapActions} from 'vuex'
import courseByUserService from '@/assets/service/courses/courseByUser'

export default {
  name: 'courseSingle',
  props: [
    'tokenCourseCurrent'
  ],
  data () {
    return {
      singleCourse: '',
      usersIdInCourse: [],
      usersNameInCourse: [],
      showAddToCourseButton: true
    }
  },
  methods: {
    addToCourse () {
      courseByUserService.addCourseForUser({
        user: this.tokenUser,
        course: this.singleCourse.token,
        name: this.singleCourse.name,
        date: this.formatDate(this.singleCourse.begin)
      }).then((result) => {
        if (result.data) {
          this.getSaveUsersInCourse()
        }
      })
    },
    formatDate (date) {
      return moment(new Date(date)).format('DD-MM-YYYY')
    },
    removeToCourse () {
      courseByUserService.deleteSaveCourseForSingleUser(this.singleCourse.token, this.tokenUser).then((result) => {
        if (result.data) {
          this.getSaveUsersInCourse()
        }
      })
    },
    exitSingleCourseView () {
      this.$emit('showDefaultCourseView')
    },
    getDataForSingleCourse () {
      this.courses.forEach((index) => {
        if (index.token === this.tokenCourseCurrent) {
          this.singleCourse = index
          return false
        }
      })
    },
    getSaveUsersInCourse () {
      this.showAddToCourseButton = true
      this.usersIdInCourse = []
      this.usersNameInCourse = []
      this.$store.dispatch('courses/getAllCoursesByToken', {token: this.singleCourse.token}).then(() => {
        setTimeout(() => {
          this.allSaveCoursesByToken.forEach((index) => {
            this.usersIdInCourse.push(index.user)
            if (index.user === this.tokenUser) {
              this.showAddToCourseButton = false
            }
          })
          this.getUserNameInCourse()
        }, 50)
      })
    },
    getUserNameInCourse () {
      this.usersIdInCourse.forEach((index) => {
        this.users.forEach((indexUser) => {
          if (indexUser.token === index) {
            this.usersNameInCourse.push(indexUser.name)
          }
        })
      })
    },
    ...mapActions('sessionUser', [
      'getUsers'
    ])
  },
  mounted () {
    this.getUsers({})
    this.getDataForSingleCourse()
    this.getSaveUsersInCourse()
  },
  computed: {
    ...mapState('courses', {
      courses: state => state.courses,
      allSaveCoursesByToken: state => state.allSaveCoursesByToken
    }),
    ...mapState('sessionUser', {
      users: state => state.users,
      tokenUser: state => state.userData.tokenUser
    })
  }
}
</script>
