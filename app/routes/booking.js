module.exports = function (Route) {
  /*
  * This route is responsible for the logic behind booking a taila.
  * NOTE: booking and job are not the same thing! they are however similar
  */

  Route
    .namespace('booking')
    .checkpoint('security:user')

  Route
    .post('/', 'create a new booking entry')
    .body({
      type: Route.type.ENUM('OCCATIONAL', 'CASUAL').invalid('INVALID_TYPE', 'The type you entered is invalid'),
      size: Route.type.NUMBER.invalid('INVALID_SIZE', 'The size you entered is invalid'),
      material_id: Route.type.STRING.invalid('INVALID_ID', 'The material_id you entered is invalid'),
      style_id: Route.type.STRING.invalid('INVALID_ID', 'The style_id you entered is invalid'),
      note: Route.type.STRING.default(null)
    })
    .then(function(){
      var self = this;
      self.success();
    })

  Route
    .get('/', 'return all current bookings')  

}