const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;
const bcrypt    = require('bcryptjs');

// A basic user type for the overview backend.
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true,'Username required.']
  },

  password: {
    type: String,
    required: [true,'Password required.']
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

// User functions.
module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.createUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        // console.log(hash);
         if(err) throw err;
          newUser.password = hash;
          newUser.save(callback);
      });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
     if(err) throw err;
     callback(null, isMatch);
  });
}