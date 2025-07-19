const { Router } = require('express');
const view = require('../controllers/view')
const router = Router();
router.get('/', view.getHome)
router.get('/product/:id', view.getProductDetails)


module.exports = router
    