export async function loadProductData() {
    try {
        const response = await fetch('data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load product data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading product data:', error);
        return [];
    }
}

export function filterByPage(items, pageName) {
    return items.filter(item => item.page === pageName);
}

export function filterByCategory(items, category) {
    return items.filter(item => item.category === category);
}

export function searchProducts(items, searchTerm) {
    return items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
}

export function getProductStats(items) {
    const products = items.filter(item => item.page === 'products' && item.price > 0);
    const prices = products.map(product => product.price);

    return {
        totalProducts: products.length,
        averagePrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
        minPrice: Math.min(...prices),
        maxPrice: Math.max(...prices),
        categories: [...new Set(products.map(product => product.category))]
    };
}
