<template>
<div class="catalog__wrapper">
        <Filter :filter-data="brands"/>

        <div class="catalog__items__wrapper">
            <p class="catalog__title">Catalog</p>
            <div class="catalog__items">
                <div
                    v-for="(product, productId) in products" 
                    :key="productId" 
                    class="catalog__item">
                    <Product :product-data="product"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type{ Product, Brand } from '~/types'

    const brands = useState<Brand[]>('setBrands', () => []); // в пиниа
    const products = useState<Product[]>('setProducts', () => []);

    const fetchBrands = async () => {
        try {
            brands.value = await $fetch<Brand[]>('/brands.json');
            if (brands.value[0].id !== 0) {
                brands.value = [{ 
                    id: 0,
                    title: "All Brands"
                }, ...brands.value];
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            products.value = await $fetch<Product[]>('/products.json');
            products.value.forEach((product: Product) => {
                product.quantity = 1;
                const brand = brands.value.find((brand: Brand) => product.brand === brand.id);
                if (brand) product.brandName = brand.title;
                else product.brandName = '';
            })
        } catch (error) {
        console.error(error);
        }
    };

    onMounted(() => {
        fetchBrands();
        fetchProducts();
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