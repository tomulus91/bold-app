<template>
    <div>
        <div v-if="dataSetting.length > 0" class="table-wrap">
            <table>
                <tr>
                    <td>Nazwa</td>
                    <td>Opcje</td>
                </tr>
                <tr v-for="setting in dataSetting">
                    <td>{{ setting.valueOption }}</td>
                    <td align="center">
                        <a href="#" @click.prevent="editUser(user.token)">Edit</a> |
                        <a href="#" @click.prevent="deleteUser(user.token)">Delete</a>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
  name: 'singleSetting',
  props: [
    'dataSetting'
  ]
}
</script>
