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
