<template>
    <div 
        class="product__wrapper">
        <SimpleProduct 
            v-if="productData.type === 'simple'"
            :product-data="productData"/>
        
        <ConfigurableProduct v-else/>
    </div>
</template>

<script setup lang="ts">
    import type { Product } from '~/types'
    const props = defineProps<{ productData: Product}>();
</script>

<style scoped lang="scss">
    .product__wrapper {
        display: grid;
        gap: 5px;
        padding: 5px;
        border: 1px solid #fff;
    }
</style>