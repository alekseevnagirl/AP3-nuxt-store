<template>
    <div 
        :style="`background-color: ${optionData.value};`" 
        class="optionItem"
        :class="isSelected ? 'optionItem__selected' : ''">
        {{ optionData.label }}
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem } from '~/types'
    const props = defineProps<{ optionData:  OptionItem, isSelected: boolean }>();
</script>

<style scoped lang="scss">
    .optionItem {
        height: auto; 
        border: 1px solid #000;
        text-align: center;
        font-size: 14px;
    }
    .optionItem:hover {
        cursor: pointer;
    }
    .optionItem__selected {
        border: 2px solid #ffd814;
    }
</style>