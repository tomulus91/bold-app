<template>
    <div class="container">
        <!--<div v-if="this.userIsLogged && this.userIsAdmin">-->
            <users-show></users-show>
        <!--</div>-->
    </div>
</template>

<script>
import UsersShow from '../components/user'

export default {
  name: 'users',
  middleware: 'authenticatedAdmin',
  components: {UsersShow}
}
</script>
