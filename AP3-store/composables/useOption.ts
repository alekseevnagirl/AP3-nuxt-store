import type { OptionItem, Variant, OptionList } from '~/types'

export function useOption(option: OptionItem, optionCode: string, variants: Variant[], allOptions: OptionList[]) {
    const selectedItem = option.value_index;
    const availableVariants = useAvailableVariants(selectedItem, variants);
    const availableOptions = useAvailableOptions(availableVariants, optionCode, allOptions);
    console.log(availableOptions)
    const disabledOptions = [12]//useDisabledOptions(availableOptions);

    return [
        disabledOptions
    ]
}