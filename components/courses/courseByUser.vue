<template>
    <div class="courses-all">
        <div v-if="courseByUser.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td >Nazwa</td>
                    <td>Status</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="course in courseByUser">
                    <td>{{ course.name }}</td>
                    <td>{{ course.status }}</td>
                    <td align="center">
                        <a href="#" @click.prevent="editUser(course._id)">Zobacz</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            Brak aktywnych kursów
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'courseByUser',
  computed: {
    ...mapState('courses', {
      courseByUser: state => state.courseByUser
    }),
    ...mapState('sessionUser', {
      tokenUser: state => state.userData['tokenUser']
    })
  },
  methods: {
    ...mapActions('courses', [
      'getActiveCourse'
    ])
  },
  mounted () {
    this.getActiveCourse({
      token: this.tokenUser
    })
  }
}
</script>
