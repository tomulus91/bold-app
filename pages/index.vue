<template>
  <section class="container">
    <div>
      <users-show></users-show>
    </div>
  </section>
</template>

<script>
    import UsersShow from "../components/user/login";

  export default {
    name: "default",
    components: {UsersShow},
    data () {
        return {}
    }
    // mounted () {
    //
    // },
    // methods: {
    //
    // },
    // destroyed () {
    // }
  }
</script>
