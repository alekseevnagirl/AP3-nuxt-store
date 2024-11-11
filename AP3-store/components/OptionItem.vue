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
    import type { OptionItem } from '~/types'

    const props = defineProps<{ 
        optionData:  OptionItem, 
        selectedValues: string[], 
        optionType: string, 
        disabledValues: string[] 
    }>();

    const isDisabled = computed(() => {
        return props.disabledValues.find((value) => {
            return value.split(' ')[0] === props.optionType
                && value.split(' ')[1] === props.optionData.value_index.toString()
        }) != undefined 
    })

    const isSelected = computed(() => {
        return props.selectedValues.find((value) => {
            return value.split(' ')[0] === props.optionType
                && value.split(' ')[1] === props.optionData.value_index.toString()
        }) != undefined
    })

    const getOptionStyle = computed(() => {
        return {
            'background-color': props.optionData.value,
            'border': isSelected.value ? '2px solid #ffd814': '1px solid #000',
            'pointer-events': isDisabled.value ? 'none' : 'auto'
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