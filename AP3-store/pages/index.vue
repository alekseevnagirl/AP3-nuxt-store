<template>
    <div>
        <Filter :filter-data="filterData"/>
    </div>
</template>

<script setup lang="ts">
    const filterData = ref(
        [
            {
                "id": 1,
                "title": "Brand 1",
                "sort": "100",
                "code": "brand_1"
            },
            {
                "id": 2,
                "title": "Brand 2",
                "sort": "200",
                "code": "brand_2"
            },
            {
                "id": 3,
                "title": "Brand 3",
                "sort": "300",
                "code": "brand_3"
            }
        ]
    )
</script>