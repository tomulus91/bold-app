<template>
    <div>
        <h1>Ustawienia aplikacji 2</h1>
        <div>
            Administratorzy systemu
        </div>
        <div>
            Ustawienia szkoleń
        </div>
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/settingsApplication'

export default {
  name: 'settingApplication',
  data () {
    return {
      settingsData: {}
    }
  },
  beforeMount () {
    this.getSettingsData()
  },
  methods: {
    getSettingsData () {
      const settingsPromise = settingsApplicationService.fetchSettings()
      settingsPromise.then((result) => {
        if (result.data) {
          console.log(result.data)
          this.settingsData = result.data
        }
      })
    }
  }
}
</script>
