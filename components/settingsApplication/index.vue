<template>
    <div class="content-settings">
        <headline :modifierClass='"headline--left-align"' :levelHeadline='"level1"' :headlineText='this.titleSetting' />
        <div class="content-settings__elements" v-if="!this.showAdminSettings && !this.showCourseSettings">
            <div class="content-settings__single content-settings__single--first" @click="setSettingToView('keyAdmin')">
                Administratorzy systemu
            </div>
            <div class="content-settings__single" @click="setSettingToView('courseSetting')">
                Ustawienia szkoleń
            </div>
        </div>
        <div class="content-settings__close" v-if="this.showAdminSettings || this.showCourseSettings" @click="setSettingToView('default')">Wyjdź</div>
        <admin-users-view :dataSetting="dataForSingleView" v-if="this.showAdminSettings" />
        <course-view :dataSetting="dataForSingleView" v-if="this.showCourseSettings" />
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/mongodb/settingsApplication'
import adminUsersView from '@/components/settingsApplication/adminUsers'
import courseView from '@/components/settingsApplication/course'
import Headline from '@/components/common/elements/headline'

export default {
  name: 'settingApplication',
  components: {
    adminUsersView,
    courseView,
    Headline
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
    setSettingToView (searchKey) {
      switch (searchKey) {
        case 'keyAdmin':
          this.titleSetting = 'Administratorzy systemu'
          this.showAdminSettings = true
          break
        case 'courseSetting':
          this.titleSetting = 'Szkolenia - ustawienia'
          this.showCourseSettings = true
          break
        case 'default':
          this.titleSetting = 'Ustawienia aplikacji'
          this.showCourseSettings = false
          this.showAdminSettings = false
          break
        default:
          this.titleSetting = 'Ustawienia aplikacji'
      }
      this.dataForSingleView = this.settingsData.filter((index) => {
        return index.keyOption === searchKey
      })
    }
  }
}
</script>
<style lang="scss">
    .content-settings {
        margin-top: 60px;

        &__close {
            float: right;
            background: #FF0000;
            padding: 15px 30px;
            color: #FFFFFFFF;
            text-transform: uppercase;
            font-size: 14px;
            font-weight: 700;
            letter-spacing: 2px;
            margin-top: 20px;
            cursor: pointer;

            &:hover {
                background: #000000;
            }
        }

        &__elements {
            clear: both;
        }

        &__single {
            width: 45%;
            text-align: center;
            float: left;
            border: 1px solid #c7c7cb;
            margin-left: 9%;
            text-transform: uppercase;
            line-height: 300px;
            margin-bottom: 60px;
            font-size: 28px;
            color: #333333;
            cursor: pointer;

            &--first {
                margin-left: 0;
            }

            &:hover {
                background: #333333;
                color: #FFFFFF;
            }
        }
    }
</style>
