<template>
    <div class="course-single-page">
        <h2>{{this.singleCourse.name}}</h2>
        <div class="exit-form" @click="exitSingleCourseView">Anuluj</div>
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
import {mapState, mapActions} from 'vuex'

export default {
  name: 'courseSingle',
  props: [
    'tokenCourseCurrent'
  ],
  data () {
    return {
      singleCourse: '',
      usersIdInCourse: [],
      usersNameInCourse: []
    }
  },
  methods: {
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
      this.$store.dispatch('courses/getAllCoursesByToken', {token: this.singleCourse.token}).then(() => {
        setTimeout(() => {
          console.log(this.allSaveCourses)
          this.allSaveCourses.forEach((index) => {
            this.usersIdInCourse.push(index.user)
          })
          this.getUserNameInCourse()
        }, 100)
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
      courses: state => state.courses
    }),
    ...mapState('courses', {
      allSaveCourses: state => state.allSaveCourses
    }),
    ...mapState('sessionUser', {
      users: state => state.users
    })
  }
}
</script>
