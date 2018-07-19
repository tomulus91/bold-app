<template>
    <div class="course-single-page">
        <div class="course-single-top">
            <headline :levelHeadline='"level2"' :headlineText='this.singleCourse.name' :modifierClass='"level2--bold headline--left-align"' />
            <div class="course-single-top__exit" @click="exitSingleCourseView">Anuluj</div>
            <div class="course-single-top__action" @click="addToCourse" v-if="showAddToCourseButton">Dodaj mnie do tego kursu</div>
            <div class="course-single-top__action course-single-top__action--remove" @click="removeToCourse" v-if="!showAddToCourseButton">Usuń mnie z tego kursu</div>
        </div>
        <div class="container-info-course">
            <p><span>Adres: </span>{{this.singleCourse.address}}</p>
            <p><span>Link do kursu: </span>{{this.singleCourse.link}}</p>
            <p><span>Kurs dla: </span>{{this.singleCourse.type}}</p>
            <p><span>Cena za kurs: </span>{{this.singleCourse.price}}</p>
            <p><span>Początek kursu: </span>{{this.singleCourse.begin}}</p>
            <p><span>Czas trwania kursu: </span>{{this.singleCourse.duration}}</p>
            <p class="emplo-info"><span>Zapisani pracownicy: </span></p>
            <table>
                <tr v-for="nameUser in usersNameInCourse">
                    <td>{{ nameUser }}</td>
                </tr>
            </table>
            <div class="add-info-course"><span>Dodatkowe informacje: </span>{{this.singleCourse.information}}</div>
        </div>
    </div>
</template>

<script>
const moment = require('moment')
import {mapState, mapActions} from 'vuex'
import courseByUserService from '@/assets/service/mongodb/courses/courseByUser'
import Headline from '@/components/common/elements/headline'

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
  components: {
    Headline
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
<style lang="scss" scoped>
    .course-single-top {
        &__title {
            float: left;
        }
        &__exit {
            float: right;
            border: none;
            padding: 15px 30px;
            background: #ffdb09;
            display: inline-block;
            width: 100%;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            text-decoration: none;
            color: #000000;
            text-align: center;
            margin-top: 20px;
            width: 100px;

            &:hover {
                background: #000000;
                color: #ffdb09;
            }
        }
        &::after {
            clear: both;
            content: '';
            display: table;
        }

        &__action {
            float: right;
            border: none;
            padding: 15px 30px;
            background: #41ec41;
            display: inline-block;
            width: 100%;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            text-decoration: none;
            color: #000000;
            text-align: center;
            margin: 20px 20px 0 0;
            width: 300px;

            &:hover {
                background: #000000;
                color: #ffdb09;
            }

            &--remove {
                background: #ff0909;
            }
        }
    }

    .container-info-course {
        margin-top: 80px;

        p {
            clear: both;
            margin-bottom: 30px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
            text-align: right;

            span {
                font-weight: 700;
                float: left;
            }

            &.emplo-info {
                margin-bottom: 10px;
                border: none;
            }
        }

        .add-info-course {
            margin-top: 60px;

            span {
                font-weight: 700;
            }
        }
    }
</style>
