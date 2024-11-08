import type { Variant, VariantAttribute } from '~/types'

export function useAvailableVariants(selectedItem: number, variants: Variant[]) {
    let availableVariants = [] as Variant[];

    variants.forEach((variant) => {
        const hasSelectedItem = variant.attributes.find((attribute: VariantAttribute) => {
            return attribute.value_index === selectedItem;
        }) !== undefined;

        if (hasSelectedItem) {
            availableVariants = availableVariants.concat(variant);
        }
    })

    return availableVariants
}