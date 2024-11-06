import type{ Product } from '~/types'

export const useProductsStore = defineStore('alerts', {
    state: () => {
        return {
            products:[] as Product[]
        }
    },
    actions: {
        addProduct(product: Product) {
            this.products.push(product)
        }
    }
})