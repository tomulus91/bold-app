<template>
    <div class="courses-wrapper">
        <banner-top :textOnBanner="'Kursy / Szkolenia'" :imageBanner="this.banner" />
        <div class="container container--courses">
            <courses-index />
        </div>
    </div>
</template>

<script>
import CoursesIndex from '../components/courses/'
import BannerTop from '@/components/page/elements/content/bannerOnTop'

export default {
  name: 'courses',
  components: {
    CoursesIndex,
    BannerTop
  },
  data () {
    return {
      banner: require('~/assets/image/boldteam.jpg')
    }
  }
}
</script>
<style lang="scss">
    .buttonForm {
        border: none;
        padding: 15px 30px;
        text-transform: uppercase;
        background: #ffdb09;
        display: inline-block;
        font-family: 'Open Sans', sans-serif;
        cursor: pointer;
        width: auto;
        float: right;
        margin-top: 20px;
        color: #000000;
        font-weight: 700;
        letter-spacing: 4px;

        a {
            text-decoration: none;
            color: #000000;
            display: block;
            padding: 15px 30px;
        }

        &--no-padd {
            padding: 0;
        }

        &:focus {
            outline: none;
        }

        &:hover {
            background: #000000;
            color: #ffdb09;

            a {
                color: #ffdb09;
            }
        }
    }
</style>
