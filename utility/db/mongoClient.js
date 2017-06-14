var mongoose = require('mongoose');

// Create Mongo Connection
module.exports.createConnection = function(config) {
  mongoose.connect('mongodb://' + config.host + '/' + config.db);

  // Set Schema differnt Collection
  var restaurantSchema = require('./restaurantSchema.js');
  mongoose.restaurantModel = restaurantSchema(mongoose);

  return mongoose;
};