
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var spaceStatusSchema = new mongoose.Schema({
  zoneName: {
    type: String,
    unique: false,
    required: true,
    trim: true
  },
  lotNumber: {
    type: Number,
    unique: false,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  },
  carInTime: {
    type: Date,
    required: true,
    trim:true
  },
  hoursOccupied: {
    type: Date,
    required: true,
    trim:true
  },
  parkingSpace: {
    type: Schema.ObjectId, ref: 'parkingSpace'
  }
});


//hashing a password before saving it to the database
// towingSchema.pre('save', function (next) {
//   var towCompany = this;
// });


var spaceStatus = mongoose.model('spaceStatus', spaceStatusSchema);
module.exports = spaceStatus;
