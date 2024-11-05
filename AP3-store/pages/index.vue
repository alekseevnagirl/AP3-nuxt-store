<template>
    <div>
        <Filter :filter-data="brands"/>
    </div>
</template>

<script setup lang="ts">
    interface Brand {
        id: number;
        title: string;
    }

    interface Product {
        id: number;
        title: string;
        brand: number;
        quantity?: number;
        brandName?: string;
    }

    let brands = useState<Brand>('setBrands', () => []);
    let products = useState<Product>('setProducts', () => []);

    const fetchBrands = async () => {
        try {
            brands = await $fetch<Brand[]>('/brands.json');
            if (brands[0].id !== 0) {
                brands = [{ 
                    id: 0,
                    title: "All Brands"
                }, ...brands];
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProducts = async () => {
        try {
            products = await $fetch<Product[]>('/products.json');
            products.forEach((product: Product) => {
                product.quantity = 1;
                const brand = brands.value.find((brand: Brand) => product.brand === brand.id);
                if (brand) product.brandName = brand.title;
                else product.brandName = '';
            })
        } catch (error) {
        console.error(error);
        }
    };

    onMounted(() => {
        fetchBrands();
        fetchProducts();
    });
</script>