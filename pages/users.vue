<template>
    <div v-if="admin">
        <users-show></users-show>
    </div>
    <div v-else>
        <p>Musisz posiadać prawa administratora aby móc zarządzać użytkownikami</p>
    </div>
</template>

<script>
    import UsersShow from "../components/user/show";

    export default {
        name: "users",
        components: {UsersShow},
        data() {
            return {
                admin: true
            }
        }
    }
</script>
