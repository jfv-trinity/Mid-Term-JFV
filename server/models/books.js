/*
File name:
Author name: Joseph Volpe
Student ID: 301118010
Web App name: Mid-Term-JFV
*/

let mongoose = require('mongoose');

// create a model class
let BookSchema = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "Books"
});

module.exports.Model = mongoose.model('Books', BookSchema);
