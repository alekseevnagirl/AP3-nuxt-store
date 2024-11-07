export function getPrice(price: number, currency: string) {
    if (price && currency) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        });
        return formatter.format(price);
    }
    else return ''
}