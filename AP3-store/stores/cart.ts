import type{ Product, Cart } from '~/types'

export const useCartStore = defineStore('alerts', {
    state: () => {
        return {
            cart:[]
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
            this.cart = this.cart.filter((product: string[]) => product.id !== productId)
        },
        updateCart(product: string[]) {
            const index = this.cart.findIndex((item: string[]) => item.id === product.id);
            this.cart[index] = product;
        }
    }
  })