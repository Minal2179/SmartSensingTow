var mongoose = require('mongoose');

var parkingSpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  zone: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  numberOfLots: {
    type: Number,
    required: true,
    maxlength:40,
    trim:true

  }
});


//hashing a password before saving it to the database
// towingSchema.pre('save', function (next) {
//   var towCompany = this;
// });


var parkingSpace = mongoose.model('parkingSpace', parkingSpaceSchema);
module.exports = parkingSpace;

