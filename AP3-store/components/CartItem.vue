<template>
    <v-card 
        variant="outlined"
        class="cartItem__wrapper">
            <div class="cartItem__image__wrapper">
                <v-img
                    cover
                    :src="cartItemData?.variant?.product?.image === undefined ? cartItemData.image : cartItemData.variant.product.image"
                    class="cartItem__image"
                />
            </div>
            
            <div class="cartItem__info__wrapper">
                <div class="cartItem__info__characteristics">
                    <div class="cartItem__brand">
                        {{ cartItemData.brandName }} / {{ cartItemData.title }}
                    </div>
                    <div v-if="cartItemData.variant"
                        class="cartItem__color__size">
                        Color: {{ cartItemData?.variant?.product?.sku.split('-')[1] }}
                    </div>
                    <div v-if="cartItemData.variant"
                        class="cartItem__color__size">
                        Size: {{ cartItemData?.variant?.product?.sku.split('-')[2].toUpperCase() }}
                    </div>
                </div>

                <div class="cartItem__price">
                    {{ currency }}{{ cartItemData?.regular_price?.value }}
                </div>

                <div>
                    <v-text-field 
                        v-model="quantity"
                        type="number" 
                        step="1" 
                        min="1"
                        hide-details
                        class="cartItem__quantity"/>
                </div>

                <div class="cartItem__total">
                    {{ currency }}{{ total }}
                </div>

                <div class="cartItem__trash__wrapper">
                    <img 
                        src="/public/images/icons/trash.png"
                        class="cartItem__trash"
                        @click="deleteFromCart">
                </div>
            </div>
    </v-card>
</template>

<script setup lang="ts">
    import deepClone from 'lodash.clonedeep'
    import type { Cart } from '~/types'
    import { useCartStore } from '~/stores/cart';

    const props = defineProps<{ cartItemData: Cart }>();

    const currency = computed(() => {
        if (props.cartItemData?.regular_price?.currency) return '$'
        else return ''
    });
    const total = computed(() => {
        const totalPrice = (props.cartItemData?.regular_price?.value * props.cartItemData.quantity).toFixed(2)
        return totalPrice
    });

    const cartStore = useCartStore();

    const quantity = computed({
        get() {
            return props.cartItemData.quantity;
        },
        set(quant: string) {
            const currentItem = deepClone(props.cartItemData); 
            currentItem.quantity = parseInt(quant);
            cartStore.updateCart(currentItem);
        }
    });

    const deleteFromCart = () => {
        const currentItem = deepClone(props.cartItemData); 
        cartStore.deleteFromCart(currentItem);
    }
</script>

<style scoped lang="scss">
    .cartItem__wrapper {
        display: flex;
        border-bottom: 1px solid #000;
        margin: 10px 0;
    }
    .cartItem__image__wrapper {
        flex: 1 1 20%;
    }
    .cartItem__info__wrapper {
        flex: 1 1 80%;
        display: flex;
        align-items: center;
        text-align: center;
        justify-content: center;
        width: 100%;
    }
    .cartItem__info__wrapper div {
        padding: 5px;
        font-size: 18px;
        flex: 1 1 10%;
    }
    .cartItem__info__wrapper div p {
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .cartItem__info__characteristics {
        flex: 1 1 40% !important;
    }
    .cartItem__brand {
        display: flex;
        align-items: center;
    }
    .cartItem__color__size {
        display: flex;
        font-size: 14px !important;
        padding: 0 0 0 5px !important;
    }
    .cartItem__image {
        width: 150px;
    }
    .cartItem__quantity {
        width: 100%;
        font-size: inherit;
    }
    .cartItem__trash {
        width: 30px;
        padding: 5px;
    }
    .cartItem__trash:hover {
        cursor: pointer;
    }

    @media(max-width: 768px) {
        .cartItem__info__wrapper {
            flex-direction: column;
            align-items: flex-start;
            max-width: 100%;
            align-content: flex-start;
        }
        .cartItem__info__wrapper div {
            max-width: 100%;
            font-size: 16px;
            flex: 1 1 20%;
        }
        .cartItem__trash {
            float: right;
            width: 30px;
        }
        .cartItem__trash__wrapper {
            width: 100%;
        }
        .cartItem__image {
            width: 150px;
            height: 150px;
        }
        .cartItem__info__characteristics {
            flex: 1 1 60% !important;
        }
        .cartItem__total {
            font-weight: bold;
        }
        .cartItem__quantity {
            width: 100px;
        }
        .cartItem__brand, .cartItem__color__size {
            padding-left: 0 !important; 
        }
    }
</style>