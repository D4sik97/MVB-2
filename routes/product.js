const { Router } = require('express');

const router = Router();
const productController = require('./../controllers/product')


router 
    .route('/')
    .post(productController.createProduct)
    .get(productController.getProducts)
    
router
    .route('/discount')
    .get(productController.getDiscountProducts)
router
    .route('/:id')
    .get(productController.getProduct)
    .patch(productController.updateProductById)
    .delete(productController.deletePrductById)


module.exports = router;
