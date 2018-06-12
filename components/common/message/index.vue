<template>
    <div class="message-container">
            <p :class="messageType">
                {{ messageText }}
            </p>
    </div>
</template>

<script>
export default {
  name: 'message',
  props: {
    'messageText': {
      type: String,
      default: ''
    },
    'messageType': {
      type: String,
      default: 'success'
    }
  }
}
</script>

<style scoped>

</style>
