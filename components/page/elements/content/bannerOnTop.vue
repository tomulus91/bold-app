<template>
    <div>
        <div class="content__banner">
            <h2 class="content__banner--text">{{textOnBanner}}</h2>
            <img class="content__banner--image" :src="imageBanner" />
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
<style lang="scss">
    .content__banner {
        position: relative;
        margin: 0;
        padding: 0;

        &--text {
            position: absolute;
            color: #FFFFFF;
            z-index: 1;
            text-transform: uppercase;
            font-size: 68px;
            bottom: 0;
            left: 80px;
            padding: 5px 40px;
            letter-spacing: 4px;
            border-bottom: 4px solid #ffda08;
            border-top: 4px solid #ffda08;
        }

        &--image {
            display: block;
            max-width: 100%;
            width: 100%;
        }

        &::after {
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            content: '';
            background: rgba(0, 0, 0, 0.7);
            top: 0;
            left: 0;
        }
    }
</style>
