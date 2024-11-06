<template>
<div class="catalog__wrapper">
        <Filter :filter-data="brandsStore.brands"/>

        <div class="catalog__items__wrapper">
            <p class="catalog__title">Catalog</p>
            <div class="catalog__items">
                <div
                    v-for="(product, productId) in productsStore.products" 
                    :key="productId" 
                    class="catalog__item">
                    <Product :product-data="product"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useBrandsStore } from '~/stores/brands' // автоимпорт в nuxt.config
    import { useProductsStore } from '~/stores/products'

    const brandsStore = useBrandsStore()
    const productsStore = useProductsStore()

    onMounted(() => {
        brandsStore.fetchBrands();
        productsStore.fetchProducts();
    });
</script>

<style scoped lang='scss'>
    .catalog__wrapper {
        padding: 20px 5%;
        display: inline-grid;
        grid-template-columns: 1fr 4fr;
        gap: 100px;
    }
    .catalog__items {
        min-width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fit, 250px);
        gap: 50px;
        justify-content: flex-start;
    }
    .catalog__title {
        font-size: 24px;
        margin: 0;
        padding: 5px;
    }
    @media(max-width: 768px) {
        .catalog__wrapper {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
        }
        .catalog__items {
            justify-content: center;
        }
    }
</style>