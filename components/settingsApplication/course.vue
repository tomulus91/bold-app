<template>
    <div>
        <div v-if="settingsData.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Wartość</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="setting in settingsData">
                    <td>Kwota na szkolenia dla 1 pracownika</td>
                    <td>
                        <span v-if="!showEditOptions">{{ setting.valueOption }} zł</span>
                        <form v-if="showEditOptions" class="form-edit" v-on:submit.prevent="submit">
                            <div class="input-wrapper">
                                <div>
                                    <label class="label-form">Budżet na szkolenia:</label>
                                    <validation-error v-if="vErrors.has('price')" :errorMessage="vErrors.first('price')"/>
                                    <input class="input-form" v-model="price" v-validate="'required|decimal'" type="text" name="price" />
                                </div>
                            </div>
                        </form>
                    </td>
                    <td align="center">
                        <a v-if="!showEditOptions" href="#" @click.prevent="editCoursePrice">Edit</a>
                        <a v-if="showEditOptions" href="#" @click.prevent="saveCoursePrice">Zapisz</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import settingsApplicationService from '@/assets/service/settingsApplication'
import ValidationError from '@/components/common/validation/ValidationError'

export default {
  name: 'course',
  data () {
    return {
      settingsData: {},
      showEditOptions: false,
      price: 0
    }
  },
  components: {
    ValidationError
  },
  mounted () {
    this.getSettingsData()
  },
  methods: {
    submit (submitEvent) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          settingsApplicationService.updateSettings({
            'key': 'keyCourse',
            'price': this.price
          }).then(() => {
            this.getSettingsData()
            this.editCoursePrice()
          })
        }
      })
    },
    saveCoursePrice () {
      this.submit()
    },
    editCoursePrice () {
      this.showEditOptions = !this.showEditOptions
    },
    getSettingsData () {
      const settingsPromise = settingsApplicationService.fetchSettings()
      settingsPromise.then((result) => {
        if (result.data) {
          this.settingsData = result.data.filter((index) => {
            return index.keyOption === 'keyCourse'
          })
        }
      }).then(() => {
        if (this.settingsData.length === 0) {
          this.addDefualtSettingCourse()
        } else {
          this.price = this.settingsData[0].valueOption
        }
      })
    },
    addDefualtSettingCourse () {
      const addSettingsPromise = settingsApplicationService.addSettings({
        nameOption: 'keyCourse',
        valueOption: 3000
      })
      addSettingsPromise.then((result) => {
        if (result.data) {
          this.getSettingsData()
        }
      })
    }
  }
}
</script>
