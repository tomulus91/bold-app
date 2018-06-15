<template>
    <div class="date-container">
        {{this.today}} <br />
        <name-day></name-day>
    </div>
</template>

<script>
import nameDay from '@/components/page/elements/header/nameDay'

export default {
  name: 'todayDate',
  components: {
    nameDay
  },
  data () {
    return {
      today: ''
    }
  },
  methods: {
    setDate () {
      const currentDate = new Date()
      const day = currentDate.getDate()
      const month = currentDate.getMonth() + 1
      const year = currentDate.getFullYear()
      const monthArray = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień']
      const weekArray = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
      this.today = weekArray[currentDate.getDay()] + ', ' + day + ' ' + monthArray[month] + ' ' + year
    }
  },
  mounted () {
    this.setDate()
  }
}
</script>
