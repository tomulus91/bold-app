<template>
    <div>
        <headline :levelHeadline='"level1"' :headlineText='this.courseData.name' />
        <button @click="exitSingleCourse">Wyjdź</button>
        <message v-if="this.updateStatus"
                 :messageType="this.updateIsErrorType ? 'success' : 'error'"
                 :messageText="this.updateIsErrorType ? 'Szkolenie zostało zaakceptowane' : 'Szkolenie zostało odrzucone'"></message>
        <p><span>Pracownik:</span> {{ this.userData.name }} </p>
        <p><span>Dostępny budżet pracownika:</span> <price/> </p>
        <p><span>Szkolenie dla:</span> {{ this.courseData.type }} </p>
        <p><span>Link do szkolenia:</span> {{ this.courseData.link }} </p>
        <p><span>Adres szkolenia:</span> {{ this.courseData.address }} </p>
        <p><span>Data rozpoczęcia szkolenia:</span> {{ this.courseData.begin }} </p>
        <p><span>Czas trwania szkolenia:</span> {{ this.courseData.duration }} </p>
        <p><span>Cena za szkolenie:</span> {{ this.courseData.price }} zł</p>
        <p><span>Dodatkowe informacje:</span> {{ this.courseData.information }}</p>
        <button v-if="this.showUpdateButtons && (this.saveCourse.status === 0 || this.saveCourse.status === -1)" @click="updateStatusCourse('accept')">Akceptuj</button>
        <button v-if="this.showUpdateButtons && (this.saveCourse.status === 0 || this.saveCourse.status === 1)" @click="updateStatusCourse('discard')">Odrzuć</button>
    </div>
</template>

<script>
import coursesServiceByUser from '~/assets/service/courses/courseByUser'
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
