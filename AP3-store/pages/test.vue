<template> 
    <div v-if="productsStore?.products[1]?.configurable_options">
        <div 
            v-for="item in productsStore.products[1].configurable_options"
            :key="item.attribute_id">
            <OptionList 
                :option-list="item"
                @choose-option="chooseOption"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem } from '~/types'
    const productsStore = useProductsStore() 
    await useAsyncData('products', () => productsStore.fetchProducts());

    const chooseOption = (option: OptionItem, optionCode: string) => {
        const disabledOptions = useOption(option, optionCode, productsStore.products[1].variants, productsStore.products[1].configurable_options);
    }
</script>