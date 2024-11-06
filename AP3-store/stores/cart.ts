import type{ Product, Cart } from '~/types'

export const useCartStore = defineStore('alerts', {
    state: () => {
        return {
            cart: [] as Cart[]
        }
    },
    actions: {
        addToCart(product: Product) { 
            const isProductInCart = this.cart.some((item) => {
                if (item.id === product.id) { 
                    item.quantity = item.quantity + 1;
                    return true;
                }
            })
            if (!isProductInCart) 
                this.cart.push(product)
        },
        deleteFromCart(productId: number) {
            this.cart = this.cart.filter((product: Cart) => product.id !== productId)
        },
        updateCart(product: Product) {
            const index = this.cart.findIndex((item: Cart) => item.id === product.id);
            this.cart[index] = product;
        }
    }
})