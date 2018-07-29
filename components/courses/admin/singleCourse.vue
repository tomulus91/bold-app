<template>
    <div class="single-course-admin">
        <div class="single-course-head">
            <headline :levelHeadline='"level1"' :headlineText='this.courseData.name' :modifierClass='"headline--left-align"' />
            <button class="single-course-head__exit" @click="exitSingleCourse">Wyjdź</button>
        </div>
        <message v-if="this.updateStatus"
                 :messageType="this.updateIsErrorType ? 'success' : 'error'"
                 :messageText="this.updateIsErrorType ? 'Szkolenie zostało zaakceptowane' : 'Szkolenie zostało odrzucone'"></message>
        <div class="single-course-content">
            <p><span>Pracownik:</span> {{ this.userData.name }} </p>
            <p class="single-course-content--price"><span>Dostępny budżet pracownika:</span> <price/> </p>
            <p><span>Szkolenie dla:</span> {{ this.courseData.type }} </p>
            <p><span>Link do szkolenia:</span> {{ this.courseData.link }} </p>
            <p><span>Adres szkolenia:</span> {{ this.courseData.address }} </p>
            <p><span>Data rozpoczęcia szkolenia:</span> {{ this.courseData.begin }} </p>
            <p><span>Czas trwania szkolenia:</span> {{ this.courseData.duration }} </p>
            <p><span>Cena za szkolenie:</span> {{ this.courseData.price }} zł</p>
            <p><span>Dodatkowe informacje:</span> {{ this.courseData.information }}</p>
            <button class="single-course-content_button single-course-content_button--accept" v-if="this.showUpdateButtons && (this.saveCourse.status === 0 || this.saveCourse.status === -1)" @click="updateStatusCourse('accept')">Akceptuj</button>
            <button class="single-course-content_button single-course-content_button--discard" v-if="this.showUpdateButtons && (this.saveCourse.status === 0 || this.saveCourse.status === 1)" @click="updateStatusCourse('discard')">Odrzuć</button>
        </div>
    </div>
</template>

<script>
import coursesServiceByUser from '~/assets/service/mongodb/courses/courseByUser'
import Message from '@/components/common/message'
import Price from '@/components/courses/price'
import Headline from '@/components/common/elements/headline'

export default {
  name: 'singleCourse',
  props: [
    'params'
  ],
  components: {
    Message,
    Price,
    Headline
  },
  data () {
    return {
      courseData: {},
      userData: {},
      updateStatus: false,
      updateIsErrorType: false,
      showUpdateButtons: true
    }
  },
  beforeMount () {
    this.setCourseData()
  },
  methods: {
    exitSingleCourse () {
      this.$emit('setDefaultView')
    },
    updateStatusCourse (typeUpdate) {
      const coursesPromise = coursesServiceByUser.updateStatusCourse({
        userToken: this.userData.token,
        courseToken: this.courseData.token,
        type: typeUpdate
      })
      this.updateIsErrorType = typeUpdate === 'accept'
      coursesPromise
        .then(response => {
          if (response.data) {
            this.updateStatus = true
            this.showUpdateButtons = false
            this.$store.dispatch('courses/getAllSaveCourses')
          }
        }).catch(e => {
          console.log(e)
        })
    },
    setCourseData () {
      this.courseData = this.params.courseData['0']
      this.userData = this.params.user['0']
      this.saveCourse = this.params.saveCourse['0']
    }
  }
}
</script>
<style lang="scss" scoped>
    .single-course-head {
        clear: both;

        &__exit {
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
            float: right;
            width: 200px;

            &:hover {
                background: #000000;
                color: #ffdb09
            }
        }

        &::after {
            clear: both;
            content: '';
            display: table;
        }
    }
    .single-course-content {
        clear: both;
        margin-top: 60px;

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

            &::after {
                clear: both;
                content: '';
                display: table;
            }
        }

        .add-info-course {
            margin-top: 60px;

            span {
                font-weight: 700;
            }
        }

        .single-course-content_button {
            border: none;
            padding: 15px 30px;
            display: inline-block;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;
            text-decoration: none;
            color: #000000;
            text-align: center;
            margin: 20px 20px 0 0;
            width: 300px;
            font-weight: 700;

            &--discard {
                background: #ff0909;
            }

            &--accept {
                background: #41ec41;
            }

            &:hover {
                background: #000000;
                color: #FFFFFF;
            }
        }

    }
</style>
