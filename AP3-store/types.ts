export interface Brand {
    id: number;
    title: string;
}

export interface Product {
    id: number;
    title: string;
    brand: number;
    quantity: number;
    brandName: string;
    regular_price: {
        currency: string;
        value: number;
    }
}

export interface Cart {
    id: number;
    title: string;
    brand: number;
    quantity: number;
    brandName: string;
    regular_price: {
        currency: string;
        value: number;
    }
}