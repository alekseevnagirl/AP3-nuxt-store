<template>
    <div v-if="configurable_options.length">
        <div 
            v-for="item in configurable_options"
            :key="item.attribute_id">
            <OptionList 
                :option-list="item"
                :disabled-values="disabledValues"
                :selected-values="selectedItems"
                @choose-option="chooseOption"/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { OptionItem, OptionList, DisabledOption } from '~/types'
    const disabledValues = ref([] as DisabledOption[]);
    const selectedItems = ref([] as string[]);

    const configurable_options: OptionList[] = [
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
    ]
  const variants = [
      {
        "attributes": [
          {
            "code": "color",
            "value_index": 931
          },
          {
            "code": "size",
            "value_index": 1441
          }
        ],
        "product": {
          "id": 2001,
          "sku": "c1-red-m",
          "image": "/images/conf/red.png"
        }
      },
      {
        "attributes": [
          {
            "code": "color",
            "value_index": 931
          },
          {
            "code": "size",
            "value_index": 1442
          }
        ],
        "product": {
          "id": 2002,
          "sku": "c1-red-l",
          "image": "/images/conf/red.png"
        }
      },
      {
        "attributes": [
          {
            "code": "color",
            "value_index": 932
          },
          {
            "code": "size",
            "value_index": 1441
          }
        ],
        "product": {
          "id": 2003,
          "sku": "c1-blue-m",
          "image": "/images/conf/blue.png"
        }
      },
      {
        "attributes": [
          {
            "code": "color",
            "value_index": 933
          },
          {
            "code": "size",
            "value_index": 1442
          }
        ],
        "product": {
          "id": 2004,
          "sku": "c1-black-l",
          "image": "/images/conf/black.png"
        }
      }
    ]

    const chooseOption = (option: OptionItem, optionCode: string, selectedItem: string) => {
        // разбираемся с выбранными значениями
        const newItem = `${optionCode} ${selectedItem}`;
        const hasSameItem = selectedItems.value.some((item) => item === newItem);
        const hasSameType = selectedItems.value.some((item) => item.split(' ')[0] === optionCode);

        const disabledValue = {} as DisabledOption;
        disabledValue.code = optionCode;

        if (hasSameItem) {
            selectedItems.value = selectedItems.value.filter((value) => value !== newItem);
            disabledValue.data = []; // здесь починить
        }
        else if (hasSameType) {
            selectedItems.value = selectedItems.value.filter((value) => value.split(' ')[0] !== optionCode);
            selectedItems.value = selectedItems.value.concat(newItem);
            disabledValue.data = useOption(option, optionCode, variants, configurable_options) || [];
            disabledValues.value = disabledValues.value.concat(disabledValue);
        }
        else { 
            selectedItems.value = selectedItems.value.concat(newItem);
            disabledValue.data = useOption(option, optionCode, variants, configurable_options) || [];
            disabledValues.value = disabledValues.value.concat(disabledValue);
        }
        console.log('dis34567890', disabledValues.value)
    }
</script>