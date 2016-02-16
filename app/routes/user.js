module.exports = function(Route) {

  /*
  * any time a new login is done we issue a new token and set
  * an expiration when we can no longer use that token.
  */
  const TOKEN_EXPIRY_INCR = 1; 
  const MIN_PASSWORD_LENGTH = 7;
  const MIN_USERNAME_LENGTH = 5;

  Route
    .namespace('user')

  Route
    .post('/signup', 'user signup')
    .body({
      email: Route.type.STRING.invalid('INVALID_EMAIL','The email address provided is invalid'),
      username: Route.type.STRING.invalid('INVALID_USERNAME','The username provided is invalid'),
      password: Route.type.STRING.invalid('INVALID_PASSWORD','The password provided is invalid'),
      gender: Route.type.ENUM('MALE', 'FEMALE').invalid('INVALID_GENDER_TYPE','The gender provided is invalid')
    })  
    .then(function(){
      var self = this,
        userObj = null,
        tokenObj = null,
        User = this.model('user'),
        Token = this.model('token'),
        calls = [];

      // before carrying unto the next step, check if the password is more than 
      // 8 charaters
      if (self.body('password').length <= MIN_PASSWORD_LENGTH) return self.error(User.PASSWORD_TOO_SHORT);
      if (self.body('username').length <= MIN_USERNAME_LENGTH) return self.error(User.USERNAME_TOO_SHORT);

      /*
      * First step, check if the email is unique.
      */
      calls.push(function(stop){
        return User.count({
          where: {
            email: self.body('email')
          }
        }).then(function(count){
          if (count !==0 ) return stop(User.EMAIL_TAKEN)
        })
      });

      /*
      * Second step, check if the username is unique.
      */
      calls.push(function(stop){
        return User.count({
          where: {
            username: self.body('username')
          }
        }).then(function(count){
          if (count !==0 ) return stop(User.USERNAME_TAKEN)
        })
      });

      /*
      * Third step, if step 1 and 2 checks out, we create the user
      */
      calls.push(function(stop){
        var _userObj = User.build({
          email: self.body('email'),
          username: self.body('username'),
          gender: self.body('gender')
        });
        _userObj.setPassword(self.body('password'));
        return _userObj.save().then(function () {
          userObj = _userObj;
        })
      });

      /*
      * fourth step, login in the user
      */
      calls.push(function(){
        var expirationDate = new Date;
        expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRY_INCR);
        var _tokenObj = Token.build({
          expires_on: expirationDate,
          user_id: userObj.get('id')
        })
        _tokenObj.generateToken(); // generate and set token
        return _tokenObj.save().then(function(){
          tokenObj = _tokenObj;
        })
      })

      /*
      * finally return finish the request
      */
      crux.series(calls).then(function(){
        self.success(tokenObj);
      }).catch(function(e){
        log.debug(e);
        self.error(e);
      })

    })

  Route
    .post('/login', 'user login')
    .body({
      username: Route.type.STRING.invalid('INVALID_USERNAME','The username provided is invalid'),
      password: Route.type.STRING.invalid('INVALID_PASSWORD','The password provided is invalid')
    })
    .then(function(){
      var self = this,
        User  = this.model('user')
        Token = this.model('token'),
        userObj = null,
        tokenObj = null,
        calls = [];

      /*
      * First step, fetch by username then check if 
      * the password provided matches what is on record
      */  
      calls.push(function(stop) {
        return User.find({
          where: {
            username: self.body('username')
          }
        }).then(function(_userObj){
          if(!_userObj) return stop(User.NOT_FOUND)
          if(!_userObj.checkPassword(self.body('password'))) return stop(User.INVALID_PASSWORD)
          userObj = _userObj;
        })
      });

      /*
      * Second step,issue a new token and attach it to the user
      */  
      calls.push(function(){
        var expirationDate = new Date;
        expirationDate.setDate(expirationDate.getDate() + TOKEN_EXPIRY_INCR);
        var _tokenObj = Token.build({
          expires_on: expirationDate,
          user_id: userObj.get('id')
        })
        _tokenObj.generateToken(); // generate and set token
        return _tokenObj.save().then(function(){
          tokenObj = _tokenObj;
        })
      })

      /*
      * finally return finish the request
      */
      crux.series(calls).then(function(){
        self.success(tokenObj);
      }).catch(function(e){
        log.debug(e);
        self.error(e);
      })
    })

  Route
    .get('/', 'get current user')
    .checkpoint('security:user')
    .then(function(userObj){
      this.success(userObj);
    });

  Route
    .get('/update', 'update current users record')
    .checkpoint('security:user')
    .body({
      username: Route.type.STRING.default(null),
      first_name: Route.type.STRING.default(null),
      last_name: Route.type.STRING.default(null),
      address: Route.type.STRING.default(null)
    })
    .then(function(userObj){
      var self = this;
      userObj.update({
        email: self.body('username') || userObj.get('username'),
        address: self.body('address') || userObj.get('address'),
        last_name: self.body('last_name') || userObj.get('last_name'),
        first_name: self.body('first_name') || userObj.get('first_name')
      }).then(function(){
        self.success(userObj);
      }).catch(function(e){
        log.debug(e);
        self.error(e);
      })
    })

  Route
    .get('/logout', 'log out current user')
    .checkpoint('security:user')
    .then(function(userObj, tokenObj){
      var self = this;
        tokenObj.update({
          user_id: null
        }).then(function(){
          self.success();
        }).catch(function(e){
          log.debug(e);
          self.error(e);
        })
    });

}






