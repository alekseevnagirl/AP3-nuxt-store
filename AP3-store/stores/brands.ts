import type{ Brand } from '~/types'

export const useBrandsStore = defineStore('alerts', {
    state: () => {
        return {
            brands:[] as Brand[]
        }
    },
    actions: {
        addBrand(brand: Brand) {
            this.brands.push(brand)
        }
    }
})