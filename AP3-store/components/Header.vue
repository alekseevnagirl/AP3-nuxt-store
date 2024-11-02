<template>
    <div :class="route.path === '/' ? 'header__wrapper' : 'header__wrapper__cart'">
        <NuxtLink to="/">
            <img src="/images/icons/logo.png" >
        </NuxtLink>

        <NuxtLink 
            v-if="route.path === '/'" 
            to="/cart"
            class="header__cart">
            <img
                src="/images/icons/cart.png" 
                class="header__cart__icon">
            <span class="header__cart__counter">
                {{ quantity }}
            </span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
    const route = useRoute();
    const quantity = computed(() => {
        return 0;
    });
</script>


<style scoped lang="scss">
    .header {
        &__wrapper {
            display: flex;
            justify-content: space-between;
            margin: 20px 5%;
            &__cart {
                display: flex;
                margin: 20px 5%;
                justify-content: center;
            }
        }
        &__cart {
            position: relative;
            padding: 5px 20px 0 0;
            &__icon {
                height: 34px;
            }
            &__counter {
                position: absolute;
                border: 1px solid #000;
                border-radius: 20px;
                padding: 1px 2px;
                min-width: 30px;
                text-align: center;
                color: #000;
                top: 0;
                right: 0;
                background-color: #fff;
            }
        }
    }
</style>