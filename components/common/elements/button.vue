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
      default: 'buttonForm buttonForm--normal'
    }
  }
}
</script>
