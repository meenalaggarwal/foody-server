var log4js = require('log4js');
var log = log4js.getLogger("users");

var app  = require('../server.js');

module.exports = {
  registerRestaurant : registerRestaurant,
  getRestaurants     : getRestaurants,
  getRestaurant      : getRestaurant
};
  
function registerRestaurant(req, res, next) {
  log.info("Entering registerRestaurant route");
  app.db.restaurantModel.register(req.body)
  .then(function(restaurant) {
    res.send(restaurant);
  }).catch(function(err) {
    next(err);
  }).done();
}

function getRestaurants(req, res, next) {
  log.info("Entering getRestaurants route");
  app.db.restaurantModel.getAll()
  .then(function(restaurant) {
    res.send(restaurant);
  }).catch(function(err) {
    next(err);
  }).done();
}

function getRestaurant(req, res, next) {
  log.info("Entering getRestaurant route");
  app.db.restaurantModel.get()
  .then(function(restaurant) {
    res.send(restaurant);
  }).catch(function(err) {
    next(err);
  }).done();
}
