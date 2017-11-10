var mongoose = require('mongoose');

var towingSchema = new mongoose.Schema({
    name: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  contact: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    maxlength:40,
    trim:true

  },
  location: {
    type: String,
    required: true,
  }
});

/*console.log("in two company model");
//hashing a password before saving it to the database
towingSchema.pre('save', function (next) {
  var towCompany = this;
});*/


var towCompany = mongoose.model('towCompany', towingSchema);
module.exports = towCompany;

