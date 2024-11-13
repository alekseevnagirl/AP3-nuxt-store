<template>
    <v-card>
        <v-img
            :width="250"
            cover
            :src="imageSrc || productData.image"
        />

        <v-card-title>
            {{ productData.title }}
        </v-card-title>

        <v-card-subtitle class="product__subtitle">
            {{ subtitle }}
        </v-card-subtitle>

        <div class="product__options">
            <div
                v-for="(option, optionId) in productData.configurable_options"
                :key="optionId">
                <OptionList 
                    :option-list="option"
                    :disabled-values="disabledValues"
                    :selected-values="selectedItems"
                    @choose-option="chooseOption"/>
            </div>
        </div>

        <v-card-actions>
            <v-btn 
                class="product__button"
                :disabled="isDisabledAddButton"
                @click="addProduct">
                Добавить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
    import deepClone from 'lodash.clonedeep';
    import type { Product } from '~/types';

    const props = defineProps<{ productData: Product}>();
    const {
        disabledValues,
        selectedItems,
        imageSrc,
        isDisabledAddButton,
        currentVariant,
        chooseOption,
    } = useSelectedOption(props.productData.variants || [], props.productData.configurable_options || []);

    const subtitle = computed(() => {
        const price = getPrice(props.productData?.regular_price?.value, props.productData?.regular_price?.currency);
        return `${props.productData.brandName}\n${price}`;
    })

    const addProduct = () => {
        const currentItem = deepClone(props.productData);
        const cartStore = useCartStore()
        console.log(currentVariant.value)
        cartStore.addToCart(currentItem);
    }
</script>

<style scoped lang="scss">
    .product__options {
        padding: 0 16px;
    }
    .product__subtitle {
        white-space: pre-line;
    }
    .product__button {
        width: 100%;
    }
</style>