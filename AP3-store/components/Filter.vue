<template>
    <div>
        {{ selectedFilterData }}
        <div class="filter__select">
            <v-select
                v-model="selectedFilterData"
                :items="filterData"
                item-text="title"
                item-value="id"
                return-object
            />
        </div>

        <div class="filter__list">
            <v-list 
                v-model="selectedFilterData"
                lines="one"
                :items="filterData"
                @update:selected="filterOut">
                <!--<v-list-item
                    v-for="(data, dataIndex) in filterData"
                    :key="dataIndex"
                    
                    :title="data.title"
                    :class="selectedId === data.id ? 'filter__list__selected' : ''"
                    @click="filterOut(data.id)"/>-->
            </v-list>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Brand } from '~/types'

    const props = defineProps<{ filterData: Brand[]}>();
    const emit = defineEmits(["selectedFilter"]);

    const selectedFilterData = ref(props.filterData[0]);

    const filterOut = () => {
        emit('selectedFilter', selectedFilterData.value.id); 
    }
</script>

<style scoped lang="scss">
    .filter__select {
        display: none;
    }
    .filter__list {
        display: block;
    }
    .filter__list__selected {
        text-decoration: underline;
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