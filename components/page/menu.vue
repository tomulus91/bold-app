<template>
    <div>
        <ul class="menu">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="userIsLogin">
                <nuxt-link to="/users">Użytkownicy</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'EditUser',
        data() {
            return {
                userIsLogin: false
            }
        },
        mounted() {
            this.checkUserIsLogin();
        },
        methods: {
            async checkUserIsLogin () {
                if (localStorage.getItem('usersToken') !== null) {
                    this.userIsLogin = true;
                }
            }
        }
    }
</script>
