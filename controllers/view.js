const Cat = require('../models/cat')
const Product = require('./../models/product')

module.exports = {
  getHome: async (req,res) => {
          const cat = await Cat.find()
          const products = await Product.find();
          res.render('index',{
             title: 'Home',
              categories: cat,
              products
          })
    },
    getProduct: async (req,res) => {
          const cat = await Cat.find()
          res.render('product',{
             title: 'Home',
              categories: cat
          })
    },
    getProductDetails: async (req, res) => {
        res.render('product',{
            title: 'Home',
            id: req.params.id
        })
    }
}