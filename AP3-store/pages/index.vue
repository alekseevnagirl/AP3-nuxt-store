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
    interface Brand {
        id: number;
        title: string;
    }

    interface Product {
        id: number;
        title: string;
        brand: number;
        quantity?: number;
        brandName?: string;
    }

    let brands = useState<Brand>('setBrands', () => []); // в пиниа
    let products = useState<Product>('setProducts', () => []);

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
        display: flex;
        flex-direction: row;
        gap: 100px;
        padding: 20px 5%;
    }
    .catalog__filters {
        flex: 1 1 15%;
    }
    .catalog__items__wrapper {
        flex: 1 1 85%;
        display: block;
    }
    .catalog__items {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 50px;
    }
    .catalog__title {
        font-size: 24px;
        margin: 0;
        padding: 5px;
    }
    @media(max-width: 768px) {
        .catalog__wrapper {
            flex-direction: column;
            gap: 20px;
        }
        .catalog__items {
            justify-content: center;
        }
    }
</style>