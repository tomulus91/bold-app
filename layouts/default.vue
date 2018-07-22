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
  components: {
    HeaderOnPage
  },
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
<style lang="scss">
    body,html {
        margin: 0;
        padding: 0;
        min-width: 100%;
        min-height: 100%;
        font-family: 'Open Sans', sans-serif;

        .container {
                width: 1000px;
                margin: 0 auto;

            &__header {
                padding: 20px 0;
            }

            &::after {
                clear: both;
                display: table;
                content: '';
            }
        }
    }
</style>
