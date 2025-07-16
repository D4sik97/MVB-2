const mongoose = require('mongoose');
const slugify = require('slugify')

const productSchema = new mongoose.Schema ({
    name:{
        type:String,
        required: true,
        trim: true
    },
    slug: String,
    price:{
        type: Number,
        required: true,
        min:[0, 'Գինը չի կարող լինել 0'],
        trim: true
    },
    cat_id:{
        type: mongoose.Schema.Types.ObjectId,
        // reference
        ref: 'Category',
        required: true
    },
    currency: {
        type:String,
        required: [true, 'Պետք է պարտադիր լրացված լինի'],
        enum: ['AMD','USD','EUR','RUB'],
        default:'AMD'
    },
    instock: {
       type: Boolean,
       default: false
    },
    description: {
        type: String,
        required: [true, 'Նկարագրությունը պետք է պարտադիր լրացված լինի'],
        maxlength:[140, 'Նկարագրությունը պետք է լինի առավելագույնը պարունակի 140 նիշ']
    }
}, {timestamps: true,toJSON:{ virtuals: true },toObject:{ virtuals: true }})

// Document middleware: runs before .save() and .create() 
productSchema.pre('save', function(next) {
    this.slug = slugify( this.name, {lower:true})
    next();
});

// Qurey MiddLeware
productSchema.pre(/^find/, function (next) {
    this.find({instock: {$ne: true}})
    this.start = Date.now();
    next()
});

productSchema.post(/^find/, function (docs,next) {
    console.log(`Query took ${Date.now() - this.start} miliseconds`);
    next()
});

productSchema.virtual('priceDiscounted')
const Product = mongoose.model('product', productSchema)

module.exports = Product;