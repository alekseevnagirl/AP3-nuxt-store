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
    const props = defineProps<{ productData: string[]}>();

    const productDataId = computed(() => {
        return 'product' + props.productData?.id
    })

    const currency = computed(() => {
        if (props.productData?.regular_price?.currency) return '$'
            else return ''
    })

    const addProduct = () => {
        //this.$store.commit("addToCart", this.productData)
    }
</script>

<style scoped>
    .product__wrapper {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 5px;
        border: 1px solid #fff;
    }
    .product__button {
        font-size: 16px;
        padding: 5px;
        width: 100%;
        background-color: #fff;
        border: 1px solid #808080;
    }
    .product__button:hover {
        cursor: pointer;
        border: 1px solid #ffdd00;
    }
    .product__name {
        font-size: 20px;
        margin: 0;
    }
    .product__info {
        font-size: 16px;
        margin: 0;
    }
    .product__image__wrapper {
        height: 300px;
        width: 250px;
        align-content: center;
    }
    .product__image {
        width: inherit;
    }
</style>