<template>
    {{ optionList.label }}
    <div class="OptionList">
        <div 
            v-for="(item, itemId) in optionItems"
            :key="itemId">
            <OptionItem 
                :option-data="item"
                :is-selected="selectedItem === item.value_index"
                @click="chooseOption(item)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem, OptionList } from '~/types'
    const props = defineProps<{ optionList: OptionList }>();
    const optionItems = ref(props.optionList.values);

    const selectedItem = ref();

    const chooseOption = (item: OptionItem) => {
        selectedItem.value = item.value_index;
    }
</script>

<style scoped lang="scss">
    .OptionList {
        display: grid;
        grid-template-columns: repeat(auto-fit, 40px);
        gap: 5px;
    }
</style>