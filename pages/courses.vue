<template>
    <div class="container">
        <courses-index></courses-index>
    </div>
</template>

<script>
import CoursesIndex from '../components/courses/'

export default {
  name: 'courses',
  middleware: 'authenticatedUser',
  components: {
    CoursesIndex
  }
}
</script>
