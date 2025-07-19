const Cat = require('../models/cat')
const Product = require('./../models/product')

module.exports = {
    getHome: async (req, res) => {
        const cat = await Cat.find()
        const products = await Product.find();
        res.render('index', {
            title: 'Home',
            categories: cat,
            products
        })
    },
    getProduct: async (req, res) => {
        const cat = await Cat.find()
        res.render('product', {
            title: 'Home',
            categories: cat
        })
    },
    getProductDetails: async (req, res) => {
        const product = await Product.findById(req.params.id)
        if (!product) return res.status(404).json({
            message: 'Product not found'
        });
        res.render('product', {
            title: 'Home',
            id: req.params.id,
            product
        })
    }
}