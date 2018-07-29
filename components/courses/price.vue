<template>
    <div class="price">
        {{ this.price }} zł
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/mongodb/settingsApplication'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'price',
  data () {
    return {
      price: 0
    }
  },
  mounted () {
    this.getActiveCourse({token: this.tokenUser})
    this.getCourses({})
    this.getPrice()
  },
  computed: {
    ...mapState('courses', {
      courseByUser: state => state.courseByUser,
      courses: state => state.courses
    }),
    ...mapState('sessionUser', {
      tokenUser: state => state.userData['tokenUser']
    })
  },
  methods: {
    ...mapActions('courses', [
      'getActiveCourse',
      'getCourses'
    ]),
    getPrice () {
      const settingsPromise = settingsApplicationService.fetchSettings()
      let data = {}
      settingsPromise.then((result) => {
        if (result.data) {
          data = result.data.filter((index) => {
            return index.keyOption === 'keyCourse'
          })
        }
      }).then(() => {
        this.price = data[0].valueOption
        setTimeout(() => {
          this.calculatePrice()
        }, 50)
      })
    },
    calculatePrice () {
      this.courseByUser.forEach((index) => {
        if (index.status === 1) {
          let course = this.courses.filter((data) => {
            return index.course === data.token
          })
          this.price -= parseFloat(course[0].price)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
    .price {
        text-align: right;
        font-weight: 700;
        color: red;
        font-size: 28px;
        letter-spacing: 2px;
        margin-bottom: 60px;

        .single-course-content--price & {
            font-weight: 400;
            color: #000000;
            font-size: 18px;
            letter-spacing: 2px;
            margin-bottom: 0;
        }
    }
</style>
