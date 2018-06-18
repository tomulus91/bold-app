<template>
    <div>
        <form class="form-add-course" v-on:submit.prevent="submit">
            <h1>Dodaj nowe szkolenie</h1>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Nazwa szkolenia:</label>
                    <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
                    <input class="input-form" v-validate="'required|min:6'" type="text" name="name" />
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Szkolenie przeznaczone dla:</label>
                    <validation-error v-if="vErrors.has('coursetype')" :errorMessage="vErrors.first('coursetype')"/>
                    <select name="coursetype" v-validate data-vv-rules="required">
                        <option value="">Wybierz dla kogo jest kurs</option>
                        <option value="FE">FE</option>
                        <option value="BE">BE</option>
                        <option value="PM">PM</option>
                        <option value="Other">Inne</option>
                    </select>
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Data rozpoczęcia szkolenia:</label>
                    <validation-error v-if="vErrors.has('Date-Start-Course')" :errorMessage="vErrors.first('Date-Start-Course')"/>
                    <input v-model="dateStartCourse" class="input-form" v-validate="'required'" type="hidden" name="Date-Start-Course" />
                    <date-picker v-model="dateStartCourse"></date-picker>
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Data zakończenia szkolenia:</label>
                    <validation-error v-if="vErrors.has('Date-End-Course')" :errorMessage="vErrors.first('Date-End-Course')"/>
                    <input v-model="dateEndCourse" class="input-form" v-validate="'required'" type="hidden" name="Date-End-Course" />
                    <date-picker v-model="dateEndCourse"></date-picker>
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Cena szkolenia (w zł):</label>
                    <validation-error v-if="vErrors.has('price')" :errorMessage="vErrors.first('price')"/>
                    <input class="input-form" v-validate="'required|decimal:' + 2" type="text" name="price" />
                </div>
            </div>
            <button-elements :buttonMessage="'Dodaj nowe szkolenie'" />
            <div class="exit-form" @click="exit(false)">Anuluj</div>
        </form>
    </div>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import ButtonElements from '@/components/common/elements/button'
import ValidationError from '@/components/common/validation/ValidationError'
import DatePicker from 'vuejs-datepicker';

Vue.use(VeeValidate, {
  errorBagName: 'vErrors'
})

export default {
  name: 'addCourses',
  components: {
    ValidationError,
    ButtonElements,
    DatePicker
  },
  data () {
    return {
      dateStartCourse: '',
      dateEndCourse: ''
    }
  },
  computed: {
    isValidateAll () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },
  methods: {
    submit (submitEvent) {
      this.$validator.validateAll().then((result) => {
        if (result) {

        }
      })
    }
  }
}
</script>
