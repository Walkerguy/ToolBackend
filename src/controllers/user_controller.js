const User    = require('../model/user.model');
var passport  = require('passport');
var jwt       = require('jsonwebtoken');
var config    = require('../config/environment');

// All the CRUD functionality for handeling users.
module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there' })
  },

  // Register.
  register(req, res, next) {
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });

    User.createUser(newUser, (err, user) => {
      console.log(newUser);
      if (err) {
        res.json({ success: false, msg: 'Failed to register a new user.' });

      } else {
        res.json({ success: true, msg: 'New user created.' });
      }
    });
  },

  //Authenticate
  authenticate(req, res, next) {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
      if (err) throw err;
      if (!user) {
        return res.json({ success: false, msg: "User not found." });
      }

      User.comparePassword(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const token = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 604800
          });

          res.json({
            success: true,
            token: 'Bearer ' + token,
            user: {
              id: user._id,
              username: user.username,
            }
          });
        } 
        
        else {
          return res.json({ success: false, msg: "Password mismatch." });
        }
      });
    });
  },

  
  // All CRUD functions.
  read(req,res,next){
    User.find({})
    .then((user) => res.status(200).send(user))
    .catch(next);
  },

  // A user by _id.
  readById(req,res,next){
    const userId = req.params.id;
    User.findById({_id: userId})
    .then((user) => res.status(200).send(user))
    .catch(next);
  },
  
  edit(req, res, next) {
    const userId = req.params.id;
    const userProps = req.body;
    User.findByIdAndUpdate({ _id: userId }, userProps)
      .then(() => User.findById({ _id: userId }))
      .then(user => res.send(user))
      .catch(next);
  },

  delete(req, res, next) {
    const userId = req.params.id;
    User.findByIdAndRemove({ _id: userId })
      .then(user => res.status(204).send(user))
      .catch(next);
  },
};