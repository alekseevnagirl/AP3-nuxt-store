<template>
    <div>
        <div v-if="isMobile">
            <v-select
                v-model="selectedFilterData"
                :items="filterData"
                item-text="title"
                item-value="id"
                return-object
            />
        </div>

        <div v-else>
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
    const isMobile = ref(false)
    const selectedId = ref(0)

    const props = defineProps<{ filterData: string[]}>();
    const emit = defineEmits<{ (id: "selectedFilter"): number }>();

    const selectedFilterData = computed({
        get() {
            return props.filterData[selectedId.value];
        },
        set(id: number) {
            filterOut(id);
        }
    });

    onMounted(() => {
        checkMobile();
        window.addEventListener('resize', checkMobile);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkMobile);
    })

    const filterOut = (id: number) => {
        emit('selectedFilter', id); 
        selectedId.value = id;
    }

    const checkMobile = () => {
        isMobile.value = window.innerWidth <= 768
    }
</script>

<style scoped lang="scss">
.filter {
    &__select {
        width: 100%;
        font-size: 18px;
        padding: 5px;
    }
    &__list__selected {
        text-decoration: underline;
    }
}
</style>