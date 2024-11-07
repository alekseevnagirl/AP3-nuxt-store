<template>
    <div>
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
            <v-list lines="one">
                <v-list-item
                    v-for="(data, dataIndex) in filterData"
                    :key="dataIndex"
                    v-model="selectedId"
                    :title="data.title"
                    :class="selectedId === data.id ? 'filter__list__selected' : ''"
                    @click="filterOut(data.id)"/>
            </v-list>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Product, Brand } from '~/types'
    const selectedId = ref(0)

    const props = defineProps<{ filterData: Product[]}>();
    const emit = defineEmits(["selectedFilter"]);

    const selectedFilterData = computed({
        get() {
            return props.filterData[selectedId.value];
        },
        set(brand: Brand) {
            filterOut(brand.id);
        }
    });

    const filterOut = (id: number) => {
        emit('selectedFilter', id); 
        selectedId.value = id;
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