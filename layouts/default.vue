<template>
    <div class="wrapper">
        <header-on-page></header-on-page>
        <nuxt/>
    </div>
</template>

<script>
import HeaderOnPage from '@/components/page/header'
import { mapActions } from 'vuex'

export default {
  name: 'layout',
  components: {HeaderOnPage},
  methods: {
    ...mapActions('sessionUser', [
      'checkSession'
    ])
  },
  mounted () {
    this.checkSession({})
  }
}
</script>
