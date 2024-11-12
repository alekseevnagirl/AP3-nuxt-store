<template>
    <SimpleProduct 
        :product-data="productData"
        :image-src="imageSrc"
        :is-disabled="isDisabled">
        <div class="configurableProduct__wrapper">
            <div
                v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <OptionList 
                        :option-list="option"
                        :disabled-values="disabledValues"
                        :selected-values="selectedItems"
                        @choose-option="chooseOption"/>
                </div>
            </div>
        </div>
    </SimpleProduct>
</template>

<script setup lang="ts">
    import type { Product, DisabledOption } from '~/types';

    const props = defineProps<{ productData: Product}>();
    const disabledValues = ref([] as DisabledOption[]);
    const selectedItems = ref([] as string[]);
    const imageSrc= ref('/images/conf/default.png');
    const isDisabled = ref(true)

    const chooseOption = (option: OptionItem, optionCode: string, selectedItem: string) => {
        [ selectedItems.value, disabledValues.value, imageSrc.value ] = 
            useSelectedOption('/images/conf/default.png', option, optionCode, props.productData.variants, props.productData.configurable_options, selectedItem, selectedItems.value, disabledValues.value);
    }
</script>

<style scoped lang="scss">
    .configurableProduct__wrapper {
        padding: 0 16px;
    }
</style>