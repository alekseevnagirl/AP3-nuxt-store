import type { OptionItem, Variant, OptionList } from '~/types'

export function useOption(option: OptionItem, optionCode: string, variants: Variant[], allOptions: OptionList[]) {
    const selectedItem = option.value_index;
    const availableVariants = useAvailableVariants(selectedItem, variants);
    const availableOptions = useAvailableOptions(availableVariants, optionCode, allOptions);
    const disabledOptions = useDisabledOptions(availableOptions, allOptions);

    return {
        availableVariants,
        availableOptions,
        disabledOptions
    }
}