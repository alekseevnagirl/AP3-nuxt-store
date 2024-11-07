export interface Brand {
    id: number;
    title: string;
    sort: string;
    code: string;
}

export interface Product {
    type: string;
    id: number;
    sku: string;
    title: string;
    regular_price: {
        currency: string;
        value: number;
    };
    image: string;
    brand: number;
    quantity: number;
    brandName: string;
}

export interface Cart {
    type: string;
    id: number;
    sku: string;
    title: string;
    regular_price: {
        currency: string;
        value: number;
    };
    image: string;
    brand: number;
    quantity: number;
    brandName: string;
}