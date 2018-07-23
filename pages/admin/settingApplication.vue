<template>
    <div class="settings-wrapper">
        <banner-top :textOnBanner="'Ustawienia systemu'" :imageBanner="this.banner" />
        <div class="container">
            <settings-application />
        </div>
    </div>
</template>

<script>
import settingsApplication from '@/components/settingsApplication/'
import BannerTop from '@/components/page/elements/content/bannerOnTop'

export default {
  name: 'settingApplication',
  middleware: 'authenticatedAdmin',
  components: {
    settingsApplication,
    BannerTop
  },
  data () {
    return {
      banner: require('~/assets/image/bannerLogin.jpg')
    }
  }
}
</script>
