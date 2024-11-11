import type { OptionList } from '~/types'

export function useDisabledOptions(availableOptions: string[], allOptions: OptionList[]) {
    // let disabledOptions = [] as string[];
    
    const availableAttributeCode = availableOptions[0].split(' ')[0]
console.log('>>>',availableAttributeCode)
    const availableValues = availableOptions.map((option) => Number(option.split(' ')[1])) as number[]
    console.log('>>>',availableValues)
    const option = allOptions.find(item => item.attribute_code === availableAttributeCode)
    console.log('>>>',option)
    const optionValues = option?.values.filter(({value_index}) => !availableValues.includes(value_index) )
    console.log('>>>',optionValues)

    const disabledOptions = optionValues?.map(({value_index}) => availableAttributeCode + ' ' + value_index)

    // allOptions.forEach((option) => {
    //     availableOptions.forEach((item) => {
    //         if (option.attribute_code === item.split(' ')[0]) {
    //             option.values.forEach((value) => {
    //                 if (value.value_index !== parseInt(item.split(' ')[1])) {
    //                     disabledOptions = disabledOptions.concat(`${option.attribute_code} ${value.value_index}`);
    //                 }
    //             })
    //         }
    //     })
    // });
    return disabledOptions
}