<template>
    <div class="container">
        <users-show></users-show>
    </div>
</template>

<script>
import UsersShow from '@/components/user/index'

export default {
  name: 'users',
  middleware: 'authenticatedAdmin',
  components: {UsersShow}
}
</script>
