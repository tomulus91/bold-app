<template>
    <section class="container">
        <div>
            <login-panel></login-panel>
        </div>
    </section>
</template>

<script>
import loginPanel from '../components/user/login'

export default {
  name: 'default',
  components: {loginPanel}
}
</script>
