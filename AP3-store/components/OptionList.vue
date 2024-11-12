<template>
    <div class="OptionList">
        <div 
            v-for="(item, itemId) in optionItems"
            :key="itemId">
            <OptionItem 
                :option-data="item"
                :selected-values="selectedValues"
                :option-type="optionList.attribute_code"
                :disabled-values="disabledValues"
                @click="chooseOption(item)"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem, OptionList, DisabledOption } from '~/types'

    const props = defineProps<{ optionList: OptionList, disabledValues: DisabledOption[], selectedValues: string[] }>();
    const optionItems = ref(props.optionList.values);
    const emit = defineEmits(["chooseOption"]);
    const selectedItem = ref();

    const chooseOption = (item: OptionItem) => {
        selectedItem.value = item.value_index;
        emit('chooseOption', item, props.optionList.attribute_code, selectedItem.value);
    }
</script>

<style scoped lang="scss">
    .OptionList {
        display: grid;
        grid-template-columns: repeat(auto-fit, 50px);
        gap: 5px;
        margin: 5px 0;
    }
</style>