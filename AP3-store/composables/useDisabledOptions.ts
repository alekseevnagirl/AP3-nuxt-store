import type { OptionList } from '~/types'

export function useDisabledOptions(availableOptions: string[], allOptions: OptionList[]) {    
    const availableAttributeCode = availableOptions[0].split(' ')[0]
    const availableValues = availableOptions.map((option) => Number(option.split(' ')[1])) as number[]
    const option = allOptions.find(item => item.attribute_code === availableAttributeCode)
    const optionValues = option?.values.filter(({value_index}) => !availableValues.includes(value_index) )
    const disabledOptions = optionValues?.map(({value_index}) => availableAttributeCode + ' ' + value_index)

    return disabledOptions
}