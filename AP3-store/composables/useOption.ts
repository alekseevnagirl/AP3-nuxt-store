import type { OptionItem, Variant, VariantAttribute } from '~/types'

export function useOption(option: OptionItem, optionId: number, variants: Variant[]) {
    const selectedItem = option.value_index;
    const availableVariants = useAvailableVariants(selectedItem, variants);

    console.log(availableVariants)

    return [
        selectedItem
    ]
}