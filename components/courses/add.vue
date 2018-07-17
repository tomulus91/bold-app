<template>
    <div>
        <form class="form-add-course" v-on:submit.prevent="submit">
            <headline :levelHeadline='"level1"' :headlineText='"Dodaj nowe szkolenie"'  />
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Nazwa szkolenia:</label>
                    <validation-error v-if="vErrors.has('name')" :errorMessage="vErrors.first('name')"/>
                    <input class="input-form" v-validate="'required|min:6'" type="text" name="name" />
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Adres szkolenia (miasto, ulica):</label>
                    <validation-error v-if="vErrors.has('address')" :errorMessage="vErrors.first('address')"/>
                    <input class="input-form" v-validate="'required'" type="text" name="address" />
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Link do szkolenia (nie wymagane):</label>
                    <input class="input-form" type="text" name="link" />
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
            <div class="input-wrapper input-wrapper--bottom">
                <div>
                    <label class="label-form">Data rozpoczęcia szkolenia:</label>
                    <validation-error v-if="vErrors.has('dateStart')" :errorMessage="vErrors.first('dateStart')"/>
                    <input v-model="dateStartCourse" class="input-form" v-validate="'required'" type="hidden" name="dateStart" />
                    <date-picker :disabledDates="{to: this.disableDate()}" :format="formatDate" input-class="input-form calendar-input" v-model="dateStartCourse"></date-picker>
                </div>
            </div>
            <div class="input-wrapper input-wrapper--bottom">
                <div>
                    <label class="label-form">Czas trwania szkolenia:</label>
                    <validation-error v-if="vErrors.has('courseduration')" :errorMessage="vErrors.first('courseduration')"/>
                    <select name="courseduration" v-validate data-vv-rules="required">
                        <option value="">Wybierz długość trwania szkolenia</option>
                        <option value="1 dzień">1 dzień</option>
                        <option value="2 dni">2 dni</option>
                        <option value="3 dni">3 dni</option>
                        <option value="4 dni">4 dni</option>
                        <option value="5 dni">5 dni</option>
                        <option value="więcej...">więcej...</option>
                    </select>
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Cena szkolenia (w zł):</label>
                    <validation-error v-if="vErrors.has('price')" :errorMessage="vErrors.first('price')"/>
                    <input class="input-form" v-validate="'required|decimal:' + 2" type="text" name="price" />
                </div>
            </div>
            <div class="input-wrapper">
                <div>
                    <label class="label-form">Inne uwagi (nie wymagane):</label>
                    <textarea class="other-information" name="otherinformation" >
                    </textarea>
                </div>
            </div>
            <div class="checkbox-admin">
                <input type="checkbox" v-model="autoAddUserForCourse" name="coursestatus" checked>Zapisz mnie automatycznie na to szkolenie<br>
            </div>
            <button-elements :buttonMessage="'Dodaj nowe szkolenie'" />
            <div class="exit-form" @click="exit(false)">Anuluj</div>
        </form>
    </div>
</template>

<script>
import ButtonElements from '@/components/common/elements/button'
import ValidationError from '@/components/common/validation/ValidationError'
import DatePicker from 'vuejs-datepicker'
import courseService from '@/assets/service/courses'
import courseByUserService from '@/assets/service/courses/courseByUser'
import { mapState } from 'vuex'
import Headline from '@/components/common/elements/headline'

const moment = require('moment')
const randomstring = require('randomstring')

export default {
  name: 'addCourses',
  components: {
    ValidationError,
    ButtonElements,
    DatePicker,
    Headline
  },
  data () {
    return {
      dateStartCourse: '',
      dateEndCourse: '',
      autoAddUserForCourse: true
    }
  },
  computed: {
    isValidateAll () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    },
    ...mapState('sessionUser', {
      tokenUser: state => state.userData['tokenUser']
    })
  },

  methods: {
    submit (submitEvent) {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const formInputs = submitEvent.target.elements
          const token = randomstring.generate()
          const dataToSend = {
            courseName: formInputs.name.value,
            courseAddress: formInputs.address.value,
            courseType: formInputs.coursetype.value,
            courseDuration: formInputs.courseduration.value,
            courseStartDate: this.formatDate(formInputs.dateStart.value),
            courseLink: formInputs.link.value,
            courseInformation: formInputs.otherinformation.value,
            coursePrice: formInputs.price.value,
            courseToken: token + formInputs.coursetype.value
          }
          courseService.addCourse(dataToSend).then(() => {
            if (this.autoAddUserForCourse) {
              courseByUserService.addCourseForUser({
                user: this.tokenUser,
                course: token + formInputs.coursetype.value,
                name: formInputs.name.value,
                date: this.formatDate(formInputs.dateStart.value)
              })
            }
          }).then(() => {
            this.$store.dispatch('courses/getCourses')
            setTimeout(() => {
              this.$store.dispatch('courses/getActiveCourse', {token: this.tokenUser})
            }, 100)
          }).then(() => {
            this.clearForm()
            this.exit(true)
          })
        }
      })
    },
    clearForm () {
      this.autoAddUserForCourse = true
      this.$validator.reset()
    },
    disableDate () {
      const today = new Date()
      return today
    },
    formatDate (date) {
      return moment(new Date(date)).format('DD-MM-YYYY')
    },
    exit (courseIsAdd) {
      this.$emit('showDefaultCourseView', courseIsAdd)
    }
  }
}
</script>
