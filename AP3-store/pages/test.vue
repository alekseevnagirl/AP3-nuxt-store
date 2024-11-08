<template> 
    <div>
        <div 
            v-for="item in optionList"
            :key="item.attribute_id">
            <OptionList :option-list="item"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionList } from '~/types'
    const optionList = ([
      {
        "attribute_id": 93,
        "attribute_code": "color",
        "label": "Color",
        "values": [
          {
            "label": "Red",
            "value_index": 931,
            "value": "#ff0000"
          },
          {
            "label": "Blue",
            "value_index": 932,
            "value": "#0000ff"
          },
          {
            "label": "Black",
            "value_index": 933,
            "value": "#000"
          }
        ]
      },
      {
        "attribute_code": "size",
        "attribute_id": 144,
        "position": 0,
        "id": 2,
        "label": "Size",
        "values": [
          {
            "label": "M",
            "value_index": 1441,
            "value": 1
          },
          {
            "label": "L",
            "value_index": 1442,
            "value": 2
          }
        ]
      }
    ] as unknown) as OptionList[];
</script>