<template>
    <div class="courses-all">
        <div v-if="courses.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td >Nazwa</td>
                    <td>Przeznaczenie</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="course in courses">
                    <td>{{ course.name }}</td>
                    <td>{{ course.type }}</td>
                    <td align="center">
                        <a href="#" @click.prevent="editUser(course.token)">Edit</a> |
                        <a href="#" @click.prevent="deleteUser(course.token)">Delete</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            Brak dostępnych kursów
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'showAllCourses',
  computed: {
    ...mapState('courses', {
      courses: state => state.courses
    })
  },
  mounted () {
    this.getCourses({})
  },
  methods: {
    ...mapActions('courses', [
      'getCourses'
    ])
  }
}
</script>
