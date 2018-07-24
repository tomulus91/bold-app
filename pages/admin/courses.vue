<template>
    <div class="courses-wrapper">
    <banner-top :textOnBanner="'Kursy / Szkolenia'" :imageBanner="this.banner" />
        <div class="container container--courses">
            <course-admin />
        </div>
    </div>
</template>

<script>
import CourseAdmin from '@/components/courses/admin/'
import BannerTop from '@/components/page/elements/content/bannerOnTop'

export default {
  name: 'courses',
  middleware: 'authenticatedAdmin',
  components: {
    CourseAdmin,
    BannerTop
  },
  data () {
    return {
      banner: require('~/assets/image/boldteam.jpg')
    }
  }
}
</script>
