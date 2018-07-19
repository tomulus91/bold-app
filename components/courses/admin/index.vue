<template>
    <div class="course-admin-panel">
        <div class="course-admin-top">
            <headline :levelHeadline='"level1"' :headlineText='this.titleCourse' :modifierClass='"headline--left-align"' />
            <span class="course-admin-top__exit"><nuxt-link to="/courses">Wyjdź</nuxt-link></span>
        </div>
        <button class="menu-course-admin" @click="setShowTypeCourse('none')">Szkolenia do rozpatrzenia</button>
        <button class="menu-course-admin" @click="setShowTypeCourse('accept')">Zaakceptowane szkolenia</button>
        <button class="menu-course-admin" @click="setShowTypeCourse('discard')">Odrzucone szkolenia</button>
        <button class="menu-course-admin" @click="setShowTypeCourse('all')">Wszystkie szkolenia</button>
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
                        <a href="#" @click.prevent="showDetails(course._id, course.user, course.course)">Zobacz szczegóły</a>
                        <a v-if="isAllCourse" class="delete-course" href="#" @click.prevent="removeCourses(course.course)">Usuń kurs</a>
                    </td>
                </tr>
            </table>
        </div>
        <headline v-if="this.coursesToAccept.length === 0 && !this.singleCourseView" :levelHeadline='"level1"' :headlineText='"Brak kursów do rozpatrzenia"' />
        <courses-single @setDefaultView="setDefaultView" :params="paramsForSingleCourse" v-if="this.singleCourseView"></courses-single>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CoursesSingle from './singleCourse'
import courseService from '@/assets/service/mongodb/courses'
import courseByUserService from '@/assets/service/mongodb/courses/courseByUser'
import Headline from '@/components/common/elements/headline'

export default {
  name: 'courseAdmin',
  components: {
    CoursesSingle,
    Headline
  },
  data () {
    return {
      allUsersArray: {},
      paramsForSingleCourse: {},
      singleCourseView: false,
      showTypeCourse: 0,
      titleCourse: 'Szkolenia do rozpatrzenia',
      isAllCourse: false
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
      if (this.showTypeCourse !== 2) {
        return this.allSaveCourse.filter((index) => {
          return index.status === this.showTypeCourse
        })
      } else {
        return this.allSaveCourse
      }
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
    removeCourses (courseToken) {
      const coursePromise = courseService.deleteCourse(courseToken)
      coursePromise.then((result) => {
        if (result.data) {
          const courseSavePromise = courseByUserService.deleteSaveCourse(courseToken)
          courseSavePromise.then((resultSave) => {
            if (resultSave.data) {
              this.getAllSaveCourses({})
              this.getCourses({})
            }
          })
        }
      })
    },
    setShowTypeCourse (type) {
      this.isAllCourse = false
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
        case 'all':
          this.showTypeCourse = 2
          this.isAllCourse = true
          this.titleCourse = 'Wszystkie szkolenia'
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
<style lang="scss" scoped>
.course-admin-panel {
    .course-admin-top {
        &__title {
            float: left;
        }
        &__exit{
            float: right;

            a {
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

                &:hover {
                    background: #000000;
                    color: #ffdb09;
                }
            }
        }
        &::after {
            clear: both;
            content: '';
            display: table;
        }
    }

    .delete-course {
        display: block;
        margin-top: 10px;
    }

    .menu-course-admin {
        background: #000000;
        border: none;
        color: #FFFFFF;
        font-size: 18px;
        border-right: 2px solid #FFF;
        padding: 10px 20px;
        font-weight: 700;
        margin: 20px 0 0 0;
        cursor: pointer;

        &:hover {
            background: #4d7ef7;
        }
    }
}
</style>
