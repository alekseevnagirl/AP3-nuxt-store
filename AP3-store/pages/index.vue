<template>
    <div class="catalog__wrapper">
        <Filter
            :filter-data="brandsStore.brands"
            class="catalog__filters"
            @selected-filter="selectedFilter"/>

        <div class="catalog__items__wrapper">
            <p class="catalog__title">Catalog</p>
            <div class="catalog__items">
                <div
                    v-for="product in products" 
                    :key="product.sku" 
                    class="catalog__item">
                    <Product :product-data="product"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Product } from '~/types';

    const brandsStore = useBrandsStore()
    const productsStore = useProductsStore() 

    const filterId = ref(0);

    const products = computed(() => {
        let productsDataFiltered = productsStore.products;
        if (filterId.value !== 0) {
            productsDataFiltered = productsStore.products.filter((product: Product) => {
                return product.brand === filterId.value;
            });
        }
        return productsDataFiltered
    })
    await useAsyncData('brands', () => brandsStore.fetchBrands());
    await useAsyncData('products', () => productsStore.fetchProducts());

    const selectedFilter = (id: number) => {
        filterId.value = id;
    }
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