var uuid = require('node-uuid');

/* 
* This model encapsulates a token. A token will be able to expire
* A user can be logged into multiple devices.
*/
module.exports = function(token, Seq) {

  token
    .field('id', Seq.PRIMARY)
    .field('expires_on', Seq.DATE)
    .field('token', Seq.STRING(300))

  /* A user can be signed-on on multiple clients devices */
    token.belongsTo('user', {
      as: 'user',
      foreignKey: 'user_id'
    });
    token.index(['token'], {
      unique: true
    });

  token
    .method('generateToken', function generateToken(){
      var key = crux.util.randomString(95),
      hash = crux.util.sha2(Date.now().toString() + uuid.v4());
      var token = 'S' + key + hash.substr(0, 32);
      this.set('token', token);
      return this;
    }) 
    .method('toJSON', function toJSON(){
      var myd = {
        token: this.token
      }
      return myd;
    })

  token
    .error('NOT_FOUND', 'You must login first or sign up')   
}