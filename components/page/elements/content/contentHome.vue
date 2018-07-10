<template>
    <div class="container">
        <div class="block-home"><nuxt-link to="/courses">Szkolenia</nuxt-link></div>
        <div class="block-home block-home--disabled">Wypożyczanie książek</div>
        <div class="block-home block-home--disabled">Urlopy</div>
        <div class="block-home block-home--disabled">Aktualności</div>
    </div>
</template>

<script>
export default {
  name: 'contentHome'
}
</script>

<style lang="scss" scoped>
.block-home {
    width: 45%;
    text-align: center;
    float: left;
    border: 1px solid #c7c7cb;
    margin-left: 9%;
    text-transform: uppercase;
    line-height: 300px;
    margin-bottom: 60px;
    font-size: 28px;
    color: #333333;
    cursor: pointer;

    a {
        text-decoration: none;
        color: #333333;
        width: 100%;
        height: 100%;
        display: block;
    }

    &:nth-child(odd){
        margin-left: 0;
    }

    &:hover {
        background: #333333;

        a {
            color: #FFFFFF;
        }
    }

    &--disabled {
        &:hover {
            background: #000000;
            color: #000000;
            position: relative;

            &::before {
                position: absolute;
                content: 'Dostępne w najstępnej wersji';
                color: #FFFFFF;
                display: block;
                text-align: center;
                width: 100%;
            }
        }
    }
}
</style>
