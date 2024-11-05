export interface Brand {
    id: number;
    title: string;
}

export interface Product {
    id: number;
    title: string;
    brand: number;
    quantity?: number;
    brandName?: string;
}

export interface Cart {
    id: number;
}