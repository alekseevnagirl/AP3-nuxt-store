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

    const chooseOption = (option: OptionItem, optionId: number) => {
        const kflf = useOption(option, optionId, productsStore.products[1].variants);
    }
</script>