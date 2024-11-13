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
                    <div 
                        v-for="(attribute, attributeId) in cartItemData.variant?.attributes"
                        :key="attributeId"
                        class="cartItem__attribute">
                        {{ attribute.code }}: {{ attribute?.label }}
                    </div>
                </div>

                <div class="cartItem__price">
                    <div class="cartItem__price__title">Price:</div> 
                    {{ price }}
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
                    <div class="cartItem__price__title">Total:</div> 
                    {{ total }}
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

    const props = defineProps<{ cartItemData: Cart }>();

    const total = computed(() => {
        const totalPrice = parseFloat((props.cartItemData?.regular_price?.value * props.cartItemData.quantity).toFixed(2))
        return getPrice(totalPrice, props.cartItemData?.regular_price?.currency); 
    });

    const price = computed(() => {
        return getPrice(props.cartItemData?.regular_price?.value, props.cartItemData?.regular_price?.currency); 
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
        display: grid;
        border-bottom: 1px solid #000;
        margin: 10px 0;
        grid-template-columns: 1fr 4fr;
    }
    .cartItem__info__wrapper {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr 1fr;
        align-items: center;
        text-align: center;
        justify-content: center;
        width: 100%;
    }
    .cartItem__info__wrapper div {
        padding: 5px;
        font-size: 18px;
    }
    .cartItem__info__wrapper div p {
        margin: 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .cartItem__brand {
        text-align: left;
    }
    .cartItem__attribute {
        font-size: 14px !important;
        padding: 0 0 0 5px !important;
        text-align: left;
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
    .cartItem__price__title {
        display: none;
    }

    @media(max-width: 768px) {
        .cartItem__info__wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(5, auto);
            max-width: 100%;
            justify-items: start;
        }
        .cartItem__info__wrapper div {
            max-width: 100%;
            font-size: 16px;
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
        .cartItem__total {
            font-weight: bold;
            display: -webkit-box;
        }
        .cartItem__quantity {
            width: 100px;
        }
        .cartItem__brand, .cartItem__color__size {
            padding-left: 0 !important; 
        }
        .cartItem__price{
            display: -webkit-box;
        }
        .cartItem__price__title {
            display: block;
            padding: 0 5px !important;
        }
    }
</style>