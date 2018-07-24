<template>
    <div class="message-container">
        <span class="message-container__close" v-if="showCloseButton" @click="removeMessage()">
            close
        </span>
        <p :class="'message-container__' + messageType">
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
<style lang="scss" scoped>
    .message-container {
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
        position: relative;
        color: #000;
        text-transform: uppercase;
        clear: both;

        &__error {
            border: 2px solid #ff0000;
            padding: 15px 0;
        }

        &__success {
            border: 2px solid #adff2f;
            padding: 15px 0;
        }

        &__close {
            position: absolute;
            right: 15px;
            top: 18px;
            width: 16px;
            height: 16px;
            cursor: pointer;
            text-indent: -99999px;
            background: url('~/assets/image/close.svg') no-repeat center;
        }
    }
</style>
