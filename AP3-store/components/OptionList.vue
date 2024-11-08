<template>
    <div class="OptionList">
        <div 
            v-for="(item, itemId) in optionItems"
            :key="itemId">
            <OptionItem 
                :option-data="item"
                :is-selected="selectedItem === item.value_index"
                :option-type="optionList.attribute_code"
                :is-disabled="isDisabled"
                @click="chooseOption(item)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem, OptionList } from '~/types'

    const props = defineProps<{ optionList: OptionList, isDisabled: boolean }>();
    const optionItems = ref(props.optionList.values);
    const emit = defineEmits(["chooseOption"]);

    const selectedItem = ref();

    const chooseOption = (item: OptionItem) => {
        emit('chooseOption', item, props.optionList.attribute_code); 
        selectedItem.value = item.value_index;
    }
</script>

<style scoped lang="scss">
    .OptionList {
        display: grid;
        grid-template-columns: repeat(auto-fit, 35px);
        gap: 5px;
        margin: 5px 0;
    }
</style>