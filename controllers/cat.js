const catchAsync = require('../utils/catchAsync')
const Cat = require('./../models/cat')
const Products = require('./../models/product')

module.exports = {
    createCat: catchAsync(async (req,res) => {
        const cat = await Cat.create(req.body);
        res.status(201).json({
            status: 'succes',
            data: cat
        })
    }),
    getCats: catchAsync(async (req,res) => {
        const cats = await Cat.find();
        const products = await Products.find();


      const result = cats.map(cat => {
            // console.log(cat.name, cat.id);
            const catProducts = products.filter(p => p.cat_id.toString() === cat._id.toString())
            if(catProducts) {
                return {
                    _id: cat._id,
                    name:cat.name,
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
    getCats_v2: catchAsync(async (req,res) => {
        const cats = await Cat.find([
            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "cat_id",
                    as: "products"
                }
            }
        ])
        res.status(200).json({
         status: 'succes',
         cats
        })
    })
}