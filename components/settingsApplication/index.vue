<template>
    <div>
        <h1>{{ this.titleSetting }}</h1>
        <div content="all-setting" v-if="!this.showAdminSettings && !this.showCourseSettings">
            <div @click="setSettingToView('keyAdmin')">
                Administratorzy systemu
            </div>
            <div @click="setSettingToView('courseSetting')">
                Ustawienia szkoleń
            </div>
        </div>
        <div v-if="this.showAdminSettings || this.showCourseSettings" @click="setView">Wyjdź</div>
        <admin-users-view :dataSetting="dataForSingleView" v-if="this.showAdminSettings" />
        <course-view :dataSetting="dataForSingleView" v-if="this.showCourseSettings" />
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/settingsApplication'
import adminUsersView from '@/components/settingsApplication/adminUsers'
import courseView from '@/components/settingsApplication/course'

export default {
  name: 'settingApplication',
  components: {
    adminUsersView,
    courseView
  },
  data () {
    return {
      settingsData: {},
      showAdminSettings: false,
      showCourseSettings: false,
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
    setView (searchKey) {
      this.showAdminSettings = false
      this.showCourseSettings = false
      switch (searchKey) {
        case 'keyAdmin':
          this.showAdminSettings = true
          break
        case 'courseSetting':
          this.showCourseSettings = true
          break
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
      this.setView(searchKey)
    }
  }
}
</script>
