<template>
    <transition name="fade">
        <span class="validation-error">{{ errorMessage }}</span>
    </transition>
</template>

<script>
export default {
  name: 'ValidationError',
  props: {
    'errorMessage': {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
    .validation-error {
        color: #FF0000;
        font-size: 12px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
