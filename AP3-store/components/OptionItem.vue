<template>
    <div 
        class="optionItem"
        :style="getOptionStyle">
        <div 
            v-if="optionType === 'size'"
            class="optionItem__label">
            {{ optionData.label }}
        </div>
        <div 
            v-if="isDisabled"
            class="optionItem__disabled">
            ×
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem, DisabledOption } from '~/types'

    const props = defineProps<{ 
        optionData:  OptionItem, 
        selectedValues: string[], 
        optionType: string, 
        disabledValues: DisabledOption[] 
    }>();

    const isDisabled = computed(() => {
        return props.disabledValues.find((value) => {
            return value.data.find((item) => {
                return item === `${props.optionType} ${props.optionData.value_index}`
            }) !== undefined;
        }) !== undefined
    })

    const isSelected = computed(() => {
        return props.selectedValues.find((value) => {
            return value === `${props.optionType} ${props.optionData.value_index}`
        }) != undefined
    })

    const getOptionStyle = computed(() => {
        return {
            backgroundColor: props.optionType === 'color' ? props.optionData.value+'' : '#fff',
            border: isSelected.value ? '2px solid #ffd814': '1px solid #000',
            pointerEvents: isDisabled.value ? 'none' : 'auto'
        }
    })
</script>

<style scoped lang="scss">
    .optionItem {
        height: 20px; 
        border: 1px solid #000;
        text-align: center;
        font-size: 14px;
        position: relative;
    }
    .optionItem:hover {
        cursor: pointer;
    }
    .optionItem__label {
        position: absolute;
        width: 100%;
        text-align: center;
    }
    .optionItem__disabled {
        color: #8B0000;
        transform: scale(3);
    }
</style>