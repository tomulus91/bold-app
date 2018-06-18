<template>
    <div class="courses-all">
        <!--<div v-if="users.length > 0" class="table-wrap">-->
            <!--<table>-->
                <!--<tr>-->
                    <!--<td>Login</td>-->
                    <!--<td >Imię / Nazwisko</td>-->
                    <!--<td>Email</td>-->
                    <!--<td>Opcje</td>-->
                <!--</tr>-->
                <!--<tr v-for="user in usersArray">-->
                    <!--<td>{{ user.login }}</td>-->
                    <!--<td>{{ user.name }}</td>-->
                    <!--<td>{{ user.email }}</td>-->
                    <!--<td align="center">-->
                        <!--<a href="#" @click.prevent="editUser(user.token)">Edit</a> |-->
                        <!--<a href="#" @click.prevent="deleteUser(user.token)">Delete</a>-->
                    <!--</td>-->
                <!--</tr>-->
            <!--</table>-->
        <!--</div>-->
        <!--<div v-else>-->
            <!--Brak dostępnych kursów-->
        <!--</div>-->
    </div>
</template>

<script>
export default {
  name: 'showAllCourses'
}
</script>
