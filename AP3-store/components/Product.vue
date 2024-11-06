<template>
    <div 
        :id="productDataId"
        class="product__wrapper">
        <v-card>
            <v-img
                :width="250"
                cover
                :src="productData.image"
            />

            <v-card-title>
                {{ productData.title }}
            </v-card-title>

            <v-card-subtitle class="product__subtitle">
                {{ subtitle }}
            </v-card-subtitle>

            <v-card-actions>
                <v-btn 
                    class="product__button"
                    @click="addProduct">
                    Добавить
                </v-btn>
            </v-card-actions>
        </v-card>
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

    const subtitle = computed(() => {
        return `${props.productData.brandName}\n${currency.value}${props.productData.regular_price.value}`;
    })
    
    const addProduct = () => {
        const currentVariant = deepClone(props.productData);
        const cartStore = useCartStore()
        cartStore.addToCart(currentVariant);
    }
</script>

<style scoped lang="scss">
    .product__wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px;
        border: 1px solid #fff;
    }
    .product__subtitle {
        white-space: pre-line;
    }
    .product__button {
        width: 100%;
    }
</style>