<template>
    <button :class="buttonClass">{{ buttonMessage }}</button>
</template>

<script>
export default {
  name: 'buttonElement',
  props: {
    'buttonMessage': {
      type: String,
      default: ''
    },
    'buttonClass': {
      type: String,
      default: 'button__normal'
    }
  }
}
</script>

<style lang="scss" scoped>
    .button {
        background: yellow;
        color: #FFF;
        padding: 10px 25px;
        border: none;

        &__normal {
            color: red;
        }
    }
</style>
