require('dotenv').config();
const mongoose = require('mongoose');

//connect to mongodb

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.d9xsuxf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database connected");
    })

    .catch((err) => {
        console.log(err);
    })