const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

    
dotenv.config({path: './.env'});


const DB = process.env.DATABASE_LOCAL;
mongoose.connect(DB).then(() => console.log('DB connection successfull'));

const port = process.env.PORT || 3200;
const server = app.listen(port, () => console.log('App running on port' + port));
// 🔥 Uncaught Exceptions (rutime errors)
process.on('unhandledRejection',err => {
    console.log('Unhandle rejection! 🔥 shuttin down...');
    console.log(err.name,err.message);
    server.close(() => {
        process.exit(1);
    })
})