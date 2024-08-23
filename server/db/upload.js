const mongoose = require('mongoose')


const connectDB = ( url )=>
{
    mongoose.connect(url, {
        useNewUrlParser: true,
    })
        .then(() => {
            console.log('Connected to MongoDB database');
        })
        .catch((error) => {
            console.error('Error connecting to MongoDB:', error);
        });
    
}

module.exports = connectDB

