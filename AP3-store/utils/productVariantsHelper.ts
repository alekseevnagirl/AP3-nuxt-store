import type { OptionItem, Variant,OptionList, VariantAttribute } from '~/types'

export function productVariantsHelper(
    option: OptionItem, optionCode: string, variants: Variant[], allOptions: OptionList[]
) {    

    const selectedItem = option.value_index;
    const availableVariants = getAvailableVariants(selectedItem, variants);
    const availableOptions = getAvailableOptions(availableVariants, optionCode, allOptions);

    const availableAttributeCode = availableOptions[0].split(' ')[0]
    const availableValues = availableOptions.map((option) => Number(option.split(' ')[1])) as number[]
    const _option = allOptions.find(item => item.attribute_code === availableAttributeCode)
    const optionValues = _option?.values.filter(({value_index}) => !availableValues.includes(value_index) )
    const disabledOptions = optionValues?.map(({value_index}) => availableAttributeCode + ' ' + value_index) || []

    return {
        availableVariants,
        disabledOptions
    }
}


function getAvailableOptions(availableVariants: Variant[], optionCode: string, allOptions: OptionList[]) {
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
    availableOptions = availableOptions.filter((value, index, self) => {
        return self.indexOf(value) === index;
    });

    return availableOptions
}

function getAvailableVariants(selectedItem: number, variants: Variant[]) {
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