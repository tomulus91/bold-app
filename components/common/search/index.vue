<template>
    <input class="search-input" type="text" :placeholder="'Szukaj wg. ' + searchText" @keyup="search($event)"/>
</template>

<script>
export default {
  name: 'searchForm',
  props: {
    'arrayToSearch': {
      type: Array
    },
    'searchBy': {
      type: String
    },
    'searchText': {
      type: String
    }
  },
  methods: {
    search (e) {
      let arrayResult = []
      if (e.target.value === '') {
        arrayResult = this.arrayToSearch
      } else {
        this.arrayToSearch.forEach((index) => {
          if (index[this.searchBy].indexOf(e.target.value) !== -1) {
            arrayResult.push(index)
          }
        })
      }
      this.$emit('arrayAfterSearch', arrayResult)
    }
  }
}
</script>
