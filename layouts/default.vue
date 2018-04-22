<template>
  <div>
    <menu-page></menu-page>
    <nuxt/>
  </div>
</template>

<script>
  import MenuPage from '@/components/page/menu'

    export default {
      name: "layout",
      components: {MenuPage}
    }
</script>