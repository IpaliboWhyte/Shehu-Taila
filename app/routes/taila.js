module.exports = function (Route) {

  Route
    .namespace('taila')
    .checkpoint('security:supervisor')
    
  Route
    .post('/', 'register a new taila')
    .body({
      phone_number: Route.type.STRING.invalid('INVALID_PHONE_NUMBER','The phone number you provided is invalid'),
      first_name: Route.type.STRING.invalid('INVALID_NAME','The first name provided is invalid'),
      last_name: Route.type.STRING.invalid('INVALID_NAME','The last name provided is invalid'),
      location: Route.type.ENUM('KADUNA','ABUJA','KANO')
    })
    .then(function(){
      var self = this,
        Token = this.model('token');
        var tokenObj = Token.build({
          is_active: true,
          phone_number: self.body('phone_number'),
          first_name: self.body('first_name'),
          last_name: self.body('last_name'),
          location: self.body('locatione')
        })
    })

  /*
  * This endpoint will also be responsible for creating a job entry
  * Should be all internal
  */
  // Route
  //   .post('/broadcast/job', 'broadcast job to registered tailas')
  //   .body({
  //     booking_id: Route.type.STRING.invalid('INVALID_ID','The booking_id you provided is invalid')
  //   })
  //   .then(function(userObj, tokenObj){

  //   })
}