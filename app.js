const path = require('path');

// modules
const express = require('express');
const morgan = require('morgan');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const productRouter = require('./routes/product');
const ejs = require('ejs');

const app = express();



// Routes
const catRouter = require('./routes/cat');
const viewRouter = require('./routes/view');


// 1). MiddLeware
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));


app.set('view engine','ejs')
app.set('views',path.join(__dirname, 'views'));
// ejs.delimiter ='?';

// app.use(xss())
// app.use(mongoSanitize())
/*
  😒{name: 'Joe'}
  😊NoSQL injection Addatck {name: {$reset: 'Doe'}}
*/
//  Prevent parameter pollution
app.use(hpp({
    whitelist: ['filter', 'category','sort']
}))

// 1). 🟩 /api/products?sort=price&discount=20&catType=male
// 2). 🔥 /api/products?sort=price&sort=ratings


const liniter = rateLimit({
    windowms: 10 * 60 * 1000,
    // Թույլատրել հարցումների քանակը (Օրինակ 10)
    max: 50,
    message: ' 😒 հարցումներ լիմիտը լռացել է, փորձեք մի փոքր ուշ ',
    // Նոր header ներ,
    standarHeaders: true,
    // Հինը չոգտագործել
    legacyHeaders: false
})

app.use('/api/v1/products', productRouter);
app.use('/api/v1/cats', catRouter);
app.use('/', viewRouter)

module.exports = app; 






