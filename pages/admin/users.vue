<template>
    <div class="users-wrapper">
        <banner-top :textOnBanner="'Zarządzaj pracownikami'" :imageBanner="this.banner" />
        <div class="container container--users">
            <users-show />
        </div>
    </div>
</template>

<script>
import UsersShow from '@/components/user/index'
import BannerTop from '@/components/page/elements/content/bannerOnTop'

export default {
  name: 'users',
  middleware: 'authenticatedAdmin',
  components: {UsersShow, BannerTop},
  data () {
    return {
      banner: require('~/assets/image/boldteam.jpg')
    }
  }
}
</script>
<style lang="scss">
    .container {
        &--users {
            padding-top: 40px;

            .form-user{
                width: 500px;
                margin: 0 auto;

                .label-form {
                    display: block;
                    width: 100%;
                    font-weight: 300;
                    color: #333;
                }

                .input-form {
                    width: 100%;
                    padding: 15px 20px;
                    height: 48px;
                    box-sizing: border-box;
                    border:none;
                    border-bottom: 1px solid #c5c6ca;
                    margin-bottom: 40px;

                    &:focus {
                        outline: none;
                        border-bottom: 1px solid #47494e;
                    }
                }

                .checkbox-admin {
                    margin-bottom: 40px;
                }
            }

            .exit-form {
                background: #FF0000;
                padding: 15px 30px;
                color: #FFFFFFFF;
                text-transform: uppercase;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 2px;
                margin-top: 20px;
                cursor: pointer;
                text-align: center;

                &:hover {
                    background: #000000;
                }
            }
        }
    }
</style>
