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
<style lang="scss" scoped>
    button {
        &.buttonForm {
            border: none;
            padding: 15px 30px;
            text-transform: uppercase;
            background: #ffdb09;
            display: inline-block;
            width: 100%;
            font-family: 'Open Sans', sans-serif;
            cursor: pointer;

            &--normal {
                color: #000000;
                font-weight: 700;
                letter-spacing: 4px;
            }

            &--add-user, &--add-course {
                width: auto;
                float: right;
                margin-top: 20px;
            }

            &:hover {
                background: #000000;
                color: #ffdb09;

                a {
                    color: #ffdb09;
                }
            }

            &:focus {
                outline: none;
            }
        }
    }
</style>
