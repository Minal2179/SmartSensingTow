var mongoose = require('mongoose');

var zoneSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});


zoneSchema.statics.authenticate = function (name, callback) {
  Zone.findOne({ name: name })
    .exec(function (err, zone) {
      if (err) {
        return callback(err)
      } else if (zone) {
        var err = new Error('Zone already exists.');
        err.status = 401;
        return callback(err);
      }
      
    });
}


var Zone = mongoose.model('zone',zoneSchema);
module.exports = Zone;

