

exports.Stripe = {
    list: async (key, limit = 25) => {
        const stripe = require('stripe')(key)
        const products = await stripe.products.list({ limit: limit });
        return products
    },
    create: async (key, productData) => {
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
    },

    update: async (productID, data) => {
        const product = await stripe.products.update(
            productID,
            data
        );
    },
}




