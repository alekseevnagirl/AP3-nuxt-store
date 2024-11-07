import type{ Brand } from '~/types'

export const useBrandsStore = defineStore('brands', {
    state: () => {
        return {
            brands:[] as Brand[]
        }
    },
    actions: {
        async fetchBrands () {
            try {
                this.brands = await $fetch<Brand[]>('/brands.json');
                if (this.brands[0].id !== 0) {
                    this.brands = [{
                        id: 0,
                        title: "All Brands",
                        sort: '',
                        code: ''
                    }, ...this.brands];
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
})