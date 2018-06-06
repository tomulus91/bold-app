<template>
    <div>
        <menu-page></menu-page>
        <nuxt/>
    </div>
</template>

<script>
import MenuPage from '@/components/page/menu'
import { mapActions } from 'vuex'

export default {
  name: 'layout',
  components: {MenuPage},
  methods: {
    ...mapActions('sessionUser', [
      'checkSession'
    ])
  },
  mounted () {
    //this.checkSession({})
  }
}
</script>
