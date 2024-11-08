import type { OptionItem, Variant } from '~/types'

export function useOption(option: OptionItem, optionId: number, variants: Variant[]) {
    const selectedItem = option.value_index;
    const availableVariants = useAvailableVariants(selectedItem, variants);
    const availableOptions = useAvailableOptions(availableVariants, variants, optionId);
    const disabledOptions = useDisabledOptions(availableOptions);

    console.log(disabledOptions)

    return [
        disabledOptions
    ]
}