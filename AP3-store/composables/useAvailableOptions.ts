import type { Variant, OptionList } from '~/types'

export function useAvailableOptions(availableVariants: Variant[], optionCode: string, allOptions: OptionList[]) {
    let availableOptions = [] as string[];
    allOptions.forEach(() => {
        availableVariants.forEach((availableVariant: Variant) => {
            availableVariant.attributes.forEach((attribute) => {
                if (attribute.code !== optionCode) {
                    availableOptions = availableOptions.concat(`${attribute.code} ${attribute.value_index}`);
                }
            })
        })
    });

    return availableOptions
}