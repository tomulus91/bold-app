<template>
    <div>
        <ul class="menu">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
            </li>
            <li v-if="adminMod">
                <nuxt-link to="/users">Użytkownicy</nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import localStorage from '@/plugins/localforage';

    export default {
        name: 'EditUser',
        data() {
            return {
                userIsLogin: false,
                adminMod: false
            }
        },
        mounted() {
            this.checkUserIsLogin();
        },
        methods: {
            async checkUserIsLogin () {
                localStorage.getItem('token_login').then((resolve) => {
                    if (!!resolve) {
                        this.userIsLogin = true;
                    }
                })

                localStorage.getItem('local_isAdmin').then((resolve) => {
                    if (!!resolve && resolve) {
                        this.adminMod = true;
                    }
                })
            }
        }
    }
</script>
