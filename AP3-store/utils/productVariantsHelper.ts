import type { OptionItem, Variant,OptionList, VariantAttribute } from '~/types'

export function productVariantsHelper(
    option: OptionItem, optionCode: string, variants: Variant[], allOptions: OptionList[], selectedItems: string[]
) {    

    const selectedItem = option.value_index;
    const availableVariants = getAvailableVariants(selectedItem, variants);
    const availableOptions = getAvailableOptions(availableVariants, optionCode, allOptions);

    const availableAttributeCode = availableOptions[0].split(' ')[0]
    const availableValues = availableOptions.map((option) => Number(option.split(' ')[1])) as number[]
    const _option = allOptions.find(item => item.attribute_code === availableAttributeCode)
    const optionValues = _option?.values.filter(({value_index}) => !availableValues.includes(value_index) )
    const disabledOptions = optionValues?.map(({value_index}) => availableAttributeCode + ' ' + value_index) || []
    const selectedVariant = getSelectedVariant(availableVariants, selectedItems, allOptions);

    return {
        availableVariants,
        disabledOptions,
        selectedVariant
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

function getSelectedVariant(availableVariants: Variant[], selectedItems: string[], allOptions: OptionList[]) {
    let selectedVariant = {} as Variant;

    if (allOptions.length === selectedItems.length) {
        availableVariants.forEach((variant) => {
            let currentVariant = [] as string[]
            variant.attributes.forEach((attribute) => { // map
                currentVariant = currentVariant.concat(`${attribute.code} ${attribute.value_index}`)
            })
            console.log(currentVariant, selectedItems)
            if (arraysEqual(currentVariant, selectedItems)) selectedVariant = variant

        })
    }
    return selectedVariant
}

function arraysEqual(arr1: string[], arr2: string[]): boolean {
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();

    for (let i = 0; i < sortedArr1.length; i++) {
        if (sortedArr1[i] !== sortedArr2[i]) {
            return false;
        }
    }

    return true;
}