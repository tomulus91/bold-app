<template>
    <div class="header">
        <div class="container">
            <logo-page></logo-page>
            <today-date></today-date>
            <name-day></name-day>
            <menu-page></menu-page>
        </div>
    </div>
</template>

<script>
import MenuPage from '@/components/page/elements/header/menu'
import LogoPage from '@/components/page/elements/header/logo'
import todayDate from '@/components/page/elements/header/todayDate'
import nameDay from '@/components/page/elements/header/nameDay'
export default {
  name: 'headerOnPage',
  components: {
    MenuPage,
    LogoPage,
    todayDate,
    nameDay
  }
}
</script>
