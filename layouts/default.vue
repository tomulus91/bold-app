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

            .table-wrap {
                width: 100%;
                margin: 20px auto;
                text-align: center;
                clear: both;

                table {
                    width: 100%;

                    thead {
                        background: #f2f2f2;
                    }

                    tr {
                        text-align: center;

                        td {
                            padding: 20px 20px 20px 5px;
                            font-size: 14px;
                            width: 25%;

                            a {
                                text-decoration: none;
                                text-transform: uppercase;
                                color: #000000;
                                font-weight: 600;
                                font-size: 12px;

                                &:nth-child(2) {
                                    color: #ff0000;
                                }
                            }
                        }

                        &:first-child {
                            td {
                                background: #4d7ef7;
                                color: #fff;
                                text-transform: uppercase;
                                text-align: center;
                                font-weight: 600;
                            }
                        }

                        &:nth-child(odd) {
                            background: #f2f2f2;
                        }
                    }
                }
            }
        }
    }
</style>