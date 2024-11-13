import type { OptionItem, Variant, OptionList, DisabledOption } from '~/types'

export function useSelectedOption (variants: Variant[], configurable_options: OptionList[]) {
    const disabledValues = ref([] as DisabledOption[]);
    const selectedItems = ref([] as string[]);
    const imageSrc = ref('');
    const isDisabledAddButton = ref(true)
    const currentVariant = ref({} as Variant)

    return {
        disabledValues,
        selectedItems,
        imageSrc,
        isDisabledAddButton,
        currentVariant,
        chooseOption(option: OptionItem, optionCode: string, selectedItem: string) {
            const newItem = `${optionCode} ${selectedItem}`;
            
            let _selectedItems = unref(selectedItems)
            let _disabledValues = unref(disabledValues)

            const hasSameItem = _selectedItems.some((item) => item === newItem);
            const hasSameType = _selectedItems.some((item) => item.split(' ')[0] === optionCode);

            const disabledValue = {} as DisabledOption;
            disabledValue.code = optionCode;

            if (hasSameItem) {
                _selectedItems = _selectedItems.filter((value) => value !== newItem);
                _disabledValues = _disabledValues.filter((value) => value.code !== optionCode);
            }
            else if (hasSameType) {
                _selectedItems = _selectedItems.filter((value) => value.split(' ')[0] !== optionCode);
                _selectedItems = _selectedItems.concat(newItem);
                const { disabledOptions, availableVariants, selectedVariant } = productVariantsHelper(option, optionCode, variants, configurable_options, _selectedItems);
                disabledValue.data = disabledOptions
                currentVariant.value = selectedVariant
                imageSrc.value = availableVariants[0]?.product?.image || ''
                _disabledValues = _disabledValues.filter((value) => value.code !== optionCode);
                _disabledValues = _disabledValues.concat(disabledValue);
            }
            else { 
                _selectedItems = _selectedItems.concat(newItem);
                const { disabledOptions, availableVariants, selectedVariant } = productVariantsHelper(option, optionCode, variants, configurable_options, _selectedItems);
                disabledValue.data = disabledOptions
                currentVariant.value = selectedVariant
                imageSrc.value = availableVariants[0]?.product?.image
                _disabledValues = _disabledValues.concat(disabledValue);
            }

            if (configurable_options.length === _selectedItems.length) isDisabledAddButton.value = false;
            else isDisabledAddButton.value = true;

            if (!_selectedItems.find((item) => {
                return item.split(' ')[0] === 'color'
            })) imageSrc.value = '';

            selectedItems.value = _selectedItems
            disabledValues.value = _disabledValues
        }
    }
}