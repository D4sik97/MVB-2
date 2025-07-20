const catchAsync = require('../utils/catchAsync')
const Cat = require('./../models/cat')
const Products = require('./../models/product')

module.exports = {
    createCat: catchAsync(async (req, res) => {
        const cat = await Cat.create(req.body);
        res.status(201).json({
            status: 'succes',
            data: cat
        })
    }),
    getCats: catchAsync(async (req, res) => {
        const cats = await Cat.find();
        const products = await Products.find();


        const result = cats.map(cat => {
            // console.log(cat.name, cat.id);
            const catProducts = products.filter(p => p.cat_id.toString() === cat._id.toString())
            if (catProducts) {
                return {
                    _id: cat._id,
                    name: cat.name,
                    description: cat.description,
                    productsList: catProducts
                }
            }
        })
        res.status(200).json({
            status: 'succes',
            result
        })
    }),
    // ստանում ենք բոլոր կատեգորիաները որոնք ունեն կցված ապրանքներ
    getAllCatProductsExist: catchAsync(async (req, res) => {
        const cats = await Cat.aggregate([{
                // Միացնում ենք այլ աղյուսակ բացայից
                $lookup: {
                    from: 'products',
                    let: {
                        catId: '$_id'
                    },
                    pipeline: [{
                            $match: {
                                // expression Համեմատում ենք 
                                $expr: {
                                    $eq: ['$$catId', {
                                        $toObjectId: '$cat_id'
                                    }]
                                },
                            },
                            // $match: {
                            //     $expr: {
                            //         $and: [
                            //             { $eq: ['$$catId', { $toObjectId: '$cat_id' }] },
                            //             { $gt: [ 'productList.0', { $exists: true } ] },
                            //         ]
                            //     }
                            // }
                        },
                        {
                            $project: {
                                name: 1,
                                price: 1,
                                currency: 1
                            }
                        }
                    ],
                    as: 'productList'
                }
            },
            {
                $match: {
                    'productList.0': {
                        $exists: true
                    }
                }
            }
        ]);

        res.status(201).json({
            status: ' success',
            cats
        });
    })
}