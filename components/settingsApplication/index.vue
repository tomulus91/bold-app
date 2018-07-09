<template>
    <div>
        <h1>{{ this.titleSetting }}</h1>
        <div content="all-setting" v-if="!this.showSingleSetting">
            <div @click="setSettingToView('keyAdmin')">
                Administratorzy systemu
            </div>
            <div @click="setSettingToView('courseSetting')">
                Ustawienia szkoleń
            </div>
        </div>
        <div v-if="this.showSingleSetting" @click="setView">Wyjdź</div>
        <single-view :dataSetting="dataForSingleView" v-if="this.showSingleSetting" />
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/settingsApplication'
import singleView from '@/components/settingsApplication/singleSetting.vue'

export default {
  name: 'settingApplication',
  components: {
    singleView
  },
  data () {
    return {
      settingsData: {},
      showSingleSetting: false,
      dataForSingleView: {},
      titleSetting: 'Ustawienia aplikacji'
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
          this.settingsData = result.data
        }
      })
    },
    setView () {
      this.showSingleSetting = !this.showSingleSetting
      if (!this.showSingleSetting) {
        this.titleSetting = 'Ustawienia aplikacji'
      }
    },
    setSettingToView (searchKey) {
      switch (searchKey) {
        case 'keyAdmin':
          this.titleSetting = 'Administratorzy systemu'
          break
        case 'courseSetting':
          this.titleSetting = 'Szkolenia - ustawienia'
          break
        default:
          this.titleSetting = 'Ustawienia aplikacji'
      }
      this.dataForSingleView = this.settingsData.filter((index) => {
        return index.keyOption === searchKey
      })
      this.setView()
    }
  }
}
</script>
