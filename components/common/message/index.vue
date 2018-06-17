<template>
    <div class="message-container">
        <span class="message-close" v-if="showCloseButton" @click="removeMessage()">
            close
        </span>
        <p :class="'message-container--' + messageType">
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
    },
    'showCloseButton': {
      type: Boolean,
      default: false
    }
  },
  methods: {
    removeMessage () {
      this.$emit('removeMessage', this.messageType)
    }
  }
}
</script>
