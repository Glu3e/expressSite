/*
FileName: contacts.js
Author: Kevin Cornejo-Andrade 
WebSite: https://kevinexpress.herokuapp.com/
Description: mongo schema for contacts collection 
*/

let mongoose = require('mongoose');

// create a model class
let contactSchema = mongoose.Schema({
    name: String,
    contactNumber: Number,
    email: String,
    address: String
},
{
  collection: "contacts"
});

 

module.exports = mongoose.model('contacts', contactSchema);
