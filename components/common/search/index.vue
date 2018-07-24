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
<style lang="scss" scoped>
    .search-input {
        width: 250px;
        padding: 5px 10px;
        height: 36px;
        box-sizing: border-box;
        border:none;
        border-bottom: 1px solid #ececec;

        &:focus {
            outline: none;
            border-bottom: 1px solid #47494e;
        }

        .users-panel-top & {
            float: right;
            margin: 20px 50px 0 0;
        }
    }
</style>
