var bcrypt = require('bcrypt');

/* This is the user model which will encapsulate all information for a user */

module.exports = function(user, Seq){

  user
    .field('id', Seq.PRIMARY)
    .field('email', Seq.STRING(100))
    .field('username', Seq.STRING(50))
    .field('first_name', Seq.STRING(35))
    .field('last_name', Seq.STRING(35))
    .field('password', Seq.STRING(150))
    .field('address', Seq.STRING(300))
    .field('gender', Seq.ENUM('MALE', 'FEMALE'))
    .field('avatar_url', Seq.STRING(300))

  user  
    .method('setPassword', function setPassword(plain_text){
      var salt = bcrypt.genSaltSync(),
        hashed = bcrypt.hashSync(plain_text, salt);
      this.set('password', hashed);
    })
    .method('checkPassword', function checkPassword(plain_text) {
      return bcrypt.compareSync(plain_text, this.get('password'));
    })
    .method('toJSON', function toJSON(){
      var d = {
        id: this.id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        avatar_url: this.avatar_url
      }
      return d;
    })

  user
    .error('NOT_FOUND', 'User not found.')
    .error('INVALID_PASSWORD', 'Incorrect credentials')
    .error('EMAIL_TAKEN', 'Email already exist')
    .error('USERNAME_TAKEN', 'username already exist')
    .error('PASSWORD_TOO_SHORT', 'Password must be at least 8 charaters long')
    .error('USERNAME_TOO_SHORT', 'Username must be at least 5 charaters long')
    .error('USER_NOT_ATTACHED', 'User must first log in')
};