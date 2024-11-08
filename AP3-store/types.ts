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

export interface OptionList {
    attribute_id: number,
    attribute_code: string,
    label: string,
    values: OptionItem
}

export interface OptionItem {
    label: string,
    value_index: number,
    value: string
}