module.exports = function(Route) {

  Route.namespace('security');

  Route
    .middleware('user', 'Authorise a user')
    .header({
      'x-access-token': Route.type.STRING.default(null)
    })
    .then(function(){
      var self = this,
        User  = this.model('user'),
        Token = this.model('token');

      if(!self.header('x-access-token')) return self.fail(Token.NOT_FOUND)
        
      Token.find({
        where: {
          token: self.header('x-access-token')
        },
        include: [{
          model: User,
          as: 'user',
          required: false
        }]
      }).then(function(tokenObj){
        var userObj = tokenObj.get('user');
        if(!userObj) return self.fail(User.USER_NOT_ATTACHED);
        self.pass(userObj, tokenObj);
      })
    })

  Route
    .middleware('supervisor', 'Authorise a user')
    .header({
      'x-access-token': Route.type.STRING.default(null)
    })
    .then(function(){
      var self = this,
        User  = this.model('user'),
        Token = this.model('token');
        
      Token.find({
        where: {
          token: self.header('x-access-token')
        },
        include: [{
          model: User,
          as: 'user',
          required: false
        }]
      }).then(function(tokenObj){
        var userObj = tokenObj.get('user');
        if(!userObj) return self.fail(User.USER_NOT_ATTACHED);
        self.pass(userObj);
      })
    })

}