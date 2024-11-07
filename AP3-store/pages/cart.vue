<template>
    <div class="cart__wrapper">
        <p class="cart__title">Shopping Cart</p>

        <div class="cart__data__header">
            <p class="cart__data__header__item">Item</p>
            <div class="cart__data__info">
                <p>Price</p>
                <p>Qty</p>
                <p>Total</p>
                <p/>
            </div>
        </div>

        <div
            v-for="(item, id) in cartStore.cart" 
            :key="id">
            <CartItem 
                :cart-item-data="item"/>
        </div>

        <div class="cart__subtotal">
            {{ subtotal }}
            <v-btn>
                Checkout
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Cart } from '~/types'

    const cartStore = useCartStore();

    const subtotal = computed(() => {
        let subtotal = 0;
        cartStore.cart.forEach((product: Cart) => {
            subtotal = subtotal + (product.quantity * product?.regular_price?.value);
        })
        subtotal = parseFloat(subtotal.toFixed(2));

        if (subtotal !== 0) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: cartStore.cart[0]?.regular_price?.currency
            });
            return 'Subtotal: ' + formatter.format(subtotal);
        }
        else return 'Subtotal: 0'
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
        display: grid;
        grid-template-columns: 2.5fr 2fr;
        width: 100%;
    }
    .cart__data__header p {
        margin: 5px;
        font-weight: bold;
        font-size: 18px;
        text-align: center;
    }
    .cart__data__info {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
    }
    .cart__subtotal {
        display: grid;
        justify-content: end;
        font-size: 24px;
        font-weight: bold;
        gap: 20px;
        padding: 10px;
    }

    @media(max-width: 768px) {
        .cart__data__header {
            display: none;
        }
    }
</style>