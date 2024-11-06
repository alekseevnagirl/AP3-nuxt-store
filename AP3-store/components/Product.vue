<template>
    <div 
        :id="productDataId"
        class="product__wrapper">
        <div class="product__image__wrapper">
            <img 
                :src="productData.image" 
                class="product__image">
        </div>
        <p class="product__name">
            {{ productData.title }}
        </p>
        <p class="product__info">
            {{ productData.brandName }}
        </p>
        <p class="product__info">
            {{ currency }}{{ productData?.regular_price?.value }}
        </p>

        <button 
            class="product__button"
            @click="addProduct">
            Добавить
        </button>
    </div>
</template>

<script setup lang="ts">
    import deepClone from 'lodash.clonedeep';
    import type { Product } from '~/types'
    import { useCartStore } from '~/stores/cart' // автоимпорт в nuxt.config
    const props = defineProps<{ productData: Product}>();

    const productDataId = computed(() => {
        return 'product' + props.productData?.id
    })

    const currency = computed(() => {
        if (props.productData?.regular_price?.currency) return '$'
            else return ''
    })
    
    const addProduct = () => {
        const currentVariant = deepClone(props.productData);
        const cartStore = useCartStore()
        cartStore.addToCart(currentVariant);
    }
</script>

<style scoped lang="scss">
    .product {
        &__wrapper {
            display: grid;
            gap: 5px;
            padding: 5px;
            border: 1px solid #fff;
        }
        &__button {
            font-size: 16px;
            padding: 5px;
            width: 100%;
            background-color: #fff;
            border: 1px solid #808080;
            &__:hover {
                cursor: pointer;
                border: 1px solid #ffdd00;
            }
        }
        &__name {
            font-size: 20px;
            margin: 0;
        }
        &__info {
            font-size: 16px;
            margin: 0;
        }
        &__image {
            width: inherit;
            &__wrapper {
                height: 300px;
                width: 250px;
                align-content: center;
            }
        }
    }
</style>