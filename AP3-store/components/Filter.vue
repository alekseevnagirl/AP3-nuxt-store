<template>
    <div>
        <div class="filter__select">
            {{ selectedFilterData }}
            <v-select
                v-model="selectedFilterData"
                :items="filterData"
                item-text="title"
                item-value="id"
                return-object
                @update:model-value="filterOut"
            />
        </div>

        <div class="filter__list">
            <v-list 
                v-model="selectedFilterData"
                :items="filterData"
                item-text="title"
                item-value="id"
                @update:selected="filterOut"
            />
            
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Brand } from '~/types'

    const props = defineProps<{ filterData: Brand[]}>();
    const emit = defineEmits(["selectedFilter"]);
    const selectedFilterData = ref(props.filterData[0]);

    function filterOut(selectedIds: unknown) {
        emit('selectedFilter', (selectedIds as number[])[0]); 
    }
</script>

<style scoped lang="scss">
    .filter__select {
        display: none;
    }
    .filter__list__selected {
        text-decoration: underline;
    }
    .filter__list {
        display: block;
    }
    @media(max-width: 768px) {
        .filter__select {
            display: block;
        }
        .filter__list {
            display: none;
        }
    }
</style>