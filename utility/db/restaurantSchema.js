var Q = require('q');

function createRestaurantModel(mongoose) {
  var Schema = mongoose.Schema;

  // Schema of restaurant
  var restaurants = new Schema({
    name: String,
    title: String,
    number: String,
    address: String/*{
      plotno: String,
      streetno: String,
      city: String,
      postalcode: String,
      country: String
    }*/,
    highlights: [],
    cuisines: [],
    cost: String,
    hours: String,
    thumbnail : String,
    images: {
      menu: [],
      othes: []
    }
  }, {
    versionKey: false
  });

  var restaurantModel = mongoose.model('restaurants', restaurants);

  // Register a restaurant
  restaurantModel.register = function(data) {
    var deferred = Q.defer();
    var restaurant = new restaurantModel(data);
    restaurant.save(function(err, restaurant) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(restaurant);
      }
    });
    return deferred.promise;
  };
  
  // Get all restaurants
  restaurantModel.getAll = function() {
    var deferred = Q.defer();
    restaurantModel.find({}, {
      name: 1,
      title: 1,
      thumbnail: 1
    }, function(err, restaurants) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(restaurants);
      }
    });
    return deferred.promise;
  };
  
  // Get all restaurants
  restaurantModel.get = function(id) {
    var deferred = Q.defer();
    restaurantModel.find({_id: id}, function(err, restaurant) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(restaurant);
      }
    });
    return deferred.promise;
  };

  // Search a restaurant
  restaurantModel.search = function(searchObject, projectObject) {
    var deferred = Q.defer();
    var projectObj = {}
    if(projectObject) {
      projectObj = projectObject;
    }
    restaurantModel.find(searchObject, projectObj, function(err, restaurant) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(restaurant);
      }
    });
    return deferred.promise;
  };

  // Update an restaurant details
  restaurantModel.edit = function(searchObject, updateData) {
    var deferred = Q.defer();
    restaurantModel.findOneAndUpdate(searchObject, updateData, {new: true}, function(err, restaurant) {
      if(err) {
        deferred.reject(err);
      } else {
        deferred.resolve(restaurant);
      }
    });
    return deferred.promise;
  };

  return restaurantModel;
}

module.exports = createRestaurantModel;