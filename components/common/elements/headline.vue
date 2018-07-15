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

            &.level1 {
                &--bold {
                    font-weight: 700;
                }
            }
        }

        h2 {
            font: 300 22px/32px 'Open Sans', sans-serif;

            &.level2 {
                &--bold {
                    font-weight: 700;
                }

                &--big-letter {
                    text-transform: uppercase;
                }
            }
        }

        &--left-align {
            float: left;
        }

        &--right-align {
            float: right;
        }

        clear: both;
    }
</style>
