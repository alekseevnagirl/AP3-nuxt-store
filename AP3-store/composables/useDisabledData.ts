import type { OptionItem, Variant, OptionList } from '~/types'

export function useDisabledData(option: OptionItem, optionCode: string, variants: Variant[], allOptions: OptionList[]) {
    const selectedItem = option.value_index;
    const availableVariants = useAvailableVariants(selectedItem, variants);
    const availableOptions = useAvailableOptions(availableVariants, optionCode, allOptions);
    const disabledOptions = useDisabledOptions(availableOptions, allOptions);

    const imageSrc = availableVariants[0]?.product?.image;

    return [
        disabledOptions,
        imageSrc
    ]
}