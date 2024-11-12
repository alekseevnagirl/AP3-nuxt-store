<template>
    <SimpleProduct 
        :product-data="productData"
        :image-src="imageSrc">
        <div class="configurableProduct__wrapper">
            <div
                v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <div class="configurableProduct__items__wrapper">
                    <div 
                        v-for="(item, id) in option.values" 
                        :key="id">
                        <OptionList 
                            :option-list="item"
                            :disabled-values="disabledValues"
                            :selected-values="selectedItems"
                            @choose-option="chooseOption"/>
                    </div>
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

    const chooseOption = (option: OptionItem, optionCode: string, selectedItem: string) => {
        [ selectedItems.value, disabledValues.value, imageSrc.value ] = 
            useSelectedOption('/images/conf/default.png', option, optionCode, props.productData.variants, props.productData.configurable_options, selectedItem, selectedItems.value, disabledValues.value);
    }
</script>