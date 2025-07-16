const Product = require('./../models/product')
const mongoose = require('mongoose')

const catchAsync = require('../utils/catchAsync')

exports.createProduct = async (req,res) => {
    try {
      const newproduct = await Product.create(req.body);
      if(!mongoose.Types.ObjectId.isValid(req.body.cat_id)) {
         res.status(400).json({
            err:"invalid cat_id"
         })
      }
      res.status(201).json({
         status: 'succes',
         data: newproduct
      })
    } catch (error) {
       res.status(500).json({
        status: 'Fail',
        message: error.message
       })
    }
    
}
exports.getProducts = async (req, res) => {
    try { 
      const products = await Product.find();
      res.status(200).json({
         status: 'succes',
         data: products
      })
    } catch (error) {
       res.status(500).json({
        status: 'Fail',
        message: error.message
       })
    }
    
}
exports.getProduct = catchAsync(async (req,res,next) => {
  const product = await Product.findById(req.params.id)
  if(!product) return res.status(404).json({
   message: 'Product not found'
  });

  res.status(202).json({
    status: 'successs 👆👆👆👆',
    data: product
  })
}) 
//  UPDATE product by id
exports.updateProductById = catchAsync(async (req,res,next) => {
   const product = await Product.findByIdAndUpdate (
      req.params.id,
      req.body,
      {new: true, runValidators: true}
   );

   if(!product) return res. status(404).json({message: 'Product not found'});
   res.status(200).json({
       status: 'success',
       data: product
   })
})

// DELETE product by id
exports.deletePrductById = catchAsync(async (req,res,next) => {
   const product = await Product.findOneAndDelete(req.params.id)
   
   if(!product) return res. status(404).json({message: 'Product not found'});
   res.status(200).json({
       status: 'success',
       data: 'product delete success'
   })
}) 
exports.getDiscountProducts = catchAsync(async (req,res,next) => {
   const products = await Product.find({
      //  Վերցնում ենք բոլոր ապրանքները
      discount: {$gt: 0}
   })
   
   if(!product) return res. status(404).json({message: 'Product not found'});
   res.status(200).json({
       status: 'success',
       data: products
   })
}) 