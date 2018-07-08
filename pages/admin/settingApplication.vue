<template>
    <div class="container">
        <settings-application />
    </div>
</template>

<script>
import settingsApplication from '@/components/settingsApplication/'

export default {
  name: 'settingApplication',
  middleware: 'authenticatedAdmin',
  components: {
    settingsApplication
  }
}
</script>
