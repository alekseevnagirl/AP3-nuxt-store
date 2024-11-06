<template>
    <div class="cart__wrapper">
        <p class="cart__title">Shopping Cart</p>

        <div class="cart__data__header">
            <p class="cart__data__header__item">Item</p>
            <p>Price</p>
            <p>Qty</p>
            <p>Total</p>
            <p/>
        </div>

        <div
            v-for="(item, id) in cartItems" 
            :key="id">
            <CartItem 
                :cart-item-data="item"/>
        </div>

        <div class="cart__subtotal">
            <p>Subtotal: {{ currency }}{{ subtotal }}</p>
            <button>
                Checkout
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useCartStore } from '~/stores/cart'

    const cartStore = useCartStore();

    const cartItems = computed(() => {
        return cartStore.cart;
    })
</script>

<style>
    .cart__wrapper {
        padding: 20px 5%;
    }
    .cart__title {
        font-size: 24px;
        margin: 20px 5px;
    }
    .cart__data__header {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
    }
    .cart__data__header p {
        padding: 5px;
        flex: 1 1 10%;
        margin: 0;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .cart__data__header__item {
        flex: 1 1 55% !important;
        text-align: center;
    }
    .cart__subtotal {
        display: flex;
        align-items: flex-end;
        flex-direction: column;
        font-size: 24px;
        font-weight: bold;
    }
    .cart__subtotal button {
        font-size: 18px;
        padding: 5px 20px;
        background-color: #fff;
        box-shadow: 10px 5px 5px #808080;
    }

    @media(max-width: 768px) {
        .cart__data__header {
            display: none;
        }
    }
</style>