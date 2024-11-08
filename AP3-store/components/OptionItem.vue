<template>
    <div 
        class="optionItem"
        :style="getOptionStyle">
        <div 
            v-if="optionType === 'size'"
            class="optionItem__label">
            {{ optionData.label }}
        </div>
        <div v-if="isDisabled"
            class="optionItem__disabled">
            ×
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem } from '~/types'

    const props = defineProps<{ 
        optionData:  OptionItem, 
        isSelected: boolean, 
        optionType: string, 
        isDisabled: boolean 
    }>();

    const getOptionStyle = computed(() => {
        return {
            'background-color': props.optionData.value,
            'border': props.isSelected ? '2px solid #ffd814': '1px solid #000',
            'pointer-events': props.isDisabled ? 'none' : 'auto'
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