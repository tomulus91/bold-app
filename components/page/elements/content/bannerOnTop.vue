<template>
    <div>
        <div class="banner-top">
            <h2 class="banner-top--text">{{textOnBanner}}</h2>
            <img class="banner-top--image" :src="imageBanner" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'bannerOnTop',
  props: {
    'textOnBanner': {
      type: String,
      default: ''
    },
    'imageBanner': {
      type: String,
      default: ''
    }
  }
}
</script>
