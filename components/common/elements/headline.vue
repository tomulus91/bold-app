<template>
    <div class="headline">
        <h1 v-if="levelHeadline === 'level1'" :class="modifierClass">{{headlineText}}</h1>
        <h2 v-if="levelHeadline === 'level2'" :class="modifierClass">{{headlineText}}</h2>
    </div>
</template>

<script>
export default {
  name: 'headline',
  props: {
    'levelHeadline': {
      type: String,
      default: 'level1'
    },
    'headlineText': {
      type: String,
      default: ''
    },
    'modifierClass': {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .headline {
        h1 {
            font: 300 28px/44px 'Open Sans', sans-serif;
            text-transform: uppercase;
        }

        h2 {
            font: 22px/32px 'Open Sans', sans-serif;
            text-transform: uppercase;
            font-weight: 300;
        }

        &--left-align {
            float: left;
        }

        &--right-align {
            float: right;
        }

        &--bold {
            font-weight: 700;
        }

        clear: both;
    }
</style>
