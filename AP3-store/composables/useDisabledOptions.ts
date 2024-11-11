import type { OptionList } from '~/types'

export function useDisabledOptions(availableOptions: string[], allOptions: OptionList[]) {    
    const availableAttributeCode = availableOptions[0].split(' ')[0]
    console.log('dis', availableAttributeCode)
    const availableValues = availableOptions.map((option) => Number(option.split(' ')[1])) as number[]
    console.log('dis', availableValues)
    const option = allOptions.find(item => item.attribute_code === availableAttributeCode)
    console.log('dis', allOptions)
    const optionValues = option?.values.filter(({value_index}) => !availableValues.includes(value_index) )
    console.log('dis', optionValues)
    const disabledOptions = optionValues?.map(({value_index}) => availableAttributeCode + ' ' + value_index)
    console.log('dis', disabledOptions)
    return disabledOptions
}