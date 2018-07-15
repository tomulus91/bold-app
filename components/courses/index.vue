<template>
    <div class="container">
        <div v-if="this.userIsLogged && this.showDefaultView">
            <headline :levelHeadline='"level1"' :headlineText='"Szkolenia"' :modifierClass='"headline--left-align"' />
            <button v-if="this.userIsAdmin" class="buttonForm buttonForm--add-course no-padd">
                <nuxt-link to="/admin/courses">Zarządzaj szkoleniami</nuxt-link>
            </button>
            <message v-if="this.newCourseIsAddMessage" @removeMessage="removeMessage" :showCloseButton="true" :messageText="'Szkolenie zostało dodane'"></message>
            <div class="courses">
                <div class="courses--left">
                    <headline :levelHeadline='"level2"' :headlineText='"Dostępne szkolenia"' :modifierClass='"level2--bold level2--big-letter"' />
                    <button class="buttonForm buttonForm--add-course" @click="showAddCoursePanel">
                        Dodaj nowe
                    </button>
                    <all-courses @showSingleCourse="showSingleCourse"></all-courses>
                </div>
                <div class="courses--right">
                    <headline :levelHeadline='"level2"' :headlineText='"Twój budżet na szkolenia"' :modifierClass='"level2--bold"' />
                    <price />
                    <headline :levelHeadline='"level2"' :headlineText='"Twoje szkolenia"' :modifierClass='"level2--bold"' />
                    <course-by-user @showSingleCourse="showSingleCourse"></course-by-user>
                </div>
            </div>
        </div>
        <add-course @showDefaultCourseView="showDefaultCourseView" v-if="this.showAddCourseView"></add-course>
        <single-course @showDefaultCourseView="showDefaultCourseView" v-if="this.showSingleCourseView" :tokenCourseCurrent="this.singleCourseToken"></single-course>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Price from '@/components/courses/price'
import AllCourses from '@/components/courses/all'
import AddCourse from '@/components/courses/add'
import CourseByUser from '@/components/courses/courseByUser'
import SingleCourse from '@/components/courses/courseSingle'
import Message from '@/components/common/message'
import Headline from '@/components/common/elements/headline'

export default {
  name: 'courses',
  components: {
    AllCourses,
    AddCourse,
    Message,
    CourseByUser,
    SingleCourse,
    Price,
    Headline
  },
  data () {
    return {
      showAddCourseView: false,
      showSingleCourseView: false,
      showDefaultView: true,
      newCourseIsAddMessage: false,
      singleCourseToken: ''
    }
  },
  computed: {
    ...mapState('sessionUser', {
      userIsLogged: state => state.userData['userIsLogged'],
      userIsAdmin: state => state.userData['userIsAdmin']
    })
  },
  methods: {
    showAddCoursePanel () {
      this.showAddCourseView = true
      this.showDefaultView = false
    },
    showDefaultCourseView (courseIsAdd) {
      this.showAddCourseView = false
      this.showDefaultView = true
      this.showSingleCourseView = false
      if (courseIsAdd) {
        this.newCourseIsAddMessage = courseIsAdd
      }
    },
    removeMessage () {
      this.newCourseIsAddMessage = false
    },
    showSingleCourse (singleCourseToken) {
      this.singleCourseToken = singleCourseToken
      this.showDefaultView = false
      this.showSingleCourseView = true
    }
  }
}
</script>
<style lang="scss">
    .table-wrap {
        width: 100%;
        margin: 20px auto;
        text-align: center;
        clear: both;

        table {
            width: 100%;

            thead {
                background: #f2f2f2;
            }

            tr {
                text-align: center;

                td {
                    padding: 20px 20px 20px 5px;
                    font-size: 14px;
                    width: 25%;

                    a {
                        text-decoration: none;
                        text-transform: uppercase;
                        color: #000000;
                        font-weight: 600;
                        font-size: 12px;

                        &:nth-child(2) {
                            color: #ff0000;
                        }
                    }
                }

                &:first-child {
                    td {
                        background: #4d7ef7;
                        color: #fff;
                        text-transform: uppercase;
                        text-align: center;
                        font-weight: 600;
                    }
                }

                &:nth-child(odd) {
                    background: #f2f2f2;
                }
            }
        }
    }
</style>
