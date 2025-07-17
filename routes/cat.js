const { Router } = require('express');

const router = Router();
const catController = require('./../controllers/cat')


router 
    .route('/')
    .post(catController.createCat)
    .get(catController.getCats)
    
router.route('/all').get(catController.getAllCatProductsExist)
// router
//     .route('/:id')
//     .get(productController.getProduct)
//     .patch(productController.updateProductById)
//     .delete(productController.deletePrductById)


module.exports = router;
