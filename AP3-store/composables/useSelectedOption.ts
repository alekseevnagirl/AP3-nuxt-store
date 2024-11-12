import type { OptionItem, Variant, OptionList, DisabledOption } from '~/types'

export function useSelectedOption(option: OptionItem, optionCode: string, variants: Variant[], configurable_options: OptionList[], selectedItem: string,  selectedItems: string[], disabledValues: DisabledOption[]) {
    const newItem = `${optionCode} ${selectedItem}`;
    const imageSrc = '';

    const hasSameItem = selectedItems.some((item) => item === newItem);
    const hasSameType = selectedItems.some((item) => item.split(' ')[0] === optionCode);

    const disabledValue = {} as DisabledOption;
    disabledValue.code = optionCode;

    if (hasSameItem) {
        selectedItems = selectedItems.filter((value) => value !== newItem);
        disabledValues = disabledValues.filter((value) => value.code !== optionCode);
    }
    else if (hasSameType) {
        selectedItems = selectedItems.filter((value) => value.split(' ')[0] !== optionCode);
        selectedItems = selectedItems.concat(newItem);
        disabledValue.data = useDisabledData(option, optionCode, variants, configurable_options) || [];
        disabledValues = disabledValues.filter((value) => value.code !== optionCode);
        disabledValues = disabledValues.concat(disabledValue);
    }
    else { 
        selectedItems = selectedItems.concat(newItem);
        disabledValue.data = useDisabledData(option, optionCode, variants, configurable_options) || [];
        disabledValues = disabledValues.concat(disabledValue);
    }

    return [
        selectedItems,
        disabledValues,
        imageSrc
    ]
}