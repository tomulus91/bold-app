<template>
    <div class="container">
        <course-admin />
    </div>
</template>

<script>
import CourseAdmin from '@/components/courses/admin/'

export default {
  name: 'courses',
  middleware: 'authenticatedAdmin',
  components: {
    CourseAdmin
  }
}
</script>
