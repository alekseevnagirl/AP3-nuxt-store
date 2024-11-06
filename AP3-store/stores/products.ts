import type{ Product } from '~/types'

export const useProductsStore = defineStore('products', {
    state: () => {
        return {
            products:[] as Product[]
        }
    },
    actions: {
        async fetchProducts () {
            try {
                this.products = await $fetch<Product[]>('/products.json');
                const brandsStore = useBrandsStore();
                const brands = brandsStore.brands;
                this.products.forEach((product: Product) => {
                    product.quantity = 1;
                    const brand = brands.find((brand) => product.brand === brand.id);
                    if (brand) product.brandName = brand.title;
                    else product.brandName = '';
                }) 
            } catch (error) {
                console.error(error);
            }
        }
    }
})