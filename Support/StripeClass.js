class StripeClass {
    stripe;

    constructor(stripeKey) {
        this.stripe = require('stripe')(key)
    }

    async listProducts(limit = 25) {
        const products = await stripe.products.list({ limit: limit });
        return products
    }

    async listProductsByMetaData(search = 'category', name, limit = 25) {

        const prices = await stripe.products.search({
            limit: limit,
            query: `active:\'true\' AND metadata[\'${search}\']:\'${name}\'`,

        });

        return prices
    }

    async listPricesForProduct(name, limit = 25) {
        const prices = await stripe.prices.search({
            limit: limit,
            query: `active:\'true\' AND metadata[\'forProcuct\']:\'${name}\'`,
        });
        const arrayPrice = prices.data.map((i) => {
            return i
        })

        return arrayPrice.reverse()
    }

    async createProduct(productData) {
        const product = await stripe.products.create({
            "active": true,
            "default_price": productData?.default_price || null,
            "description": productData?.description || null,
            "images": productData?.images || [],
            "features": productData?.features || [],
            "metadata": productData?.metadata || {},
            "name": productData?.name || "Gold Plan",
            "package_dimensions": productData?.package_dimensions || null,
            "shippable": productData?.shippable || null,
            "statement_descriptor": productData?.statement_descriptor || null,
            "tax_code": productData?.tax_code || null,
            "unit_label": productData?.unit_label || null,
        });
    }

    async updateProduct(productID, data) {
        const product = await stripe.products.update(
            productID,
            data
        );
    }

    async delete(productID) {
        try {
            await stripe.products.del(productID);
        } catch (error) {
            return error.message
        }
    }



}


export default StripeClass