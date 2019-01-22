const assert      = require('assert');
const request     = require('supertest');
const app         = require('../../src/app.js');
const mongoose    = require('mongoose');
const User        = mongoose.model('user');

// Testing user CRUD.
describe('User controller', () => {
  it('post to api/users creates a new user', done => {
    User.count().then(count =>{
        request(app)
        .post('/api/users')
        .send({ username: 'Gebruiker' })
        .end(()=>{
          User.count().then(newCount =>{
            assert(count+1 === newCount);
            done();
          });
      });
    });
  });

  it('Put to api/users edits a existing user',done =>{
    const user = new User({ username: 'Gebruiker' });
    user.save().then(() =>{
      request(app)
      .put('/api/users/' + user._id)
      .send({username:"Updated"})
      .end(() =>{
        User.findOne({ _id: user._id})
        .then(user => {
          assert(user.username === "Updated");
          done();
        });
      });
    });
  });

  it('DELETE to /api/users/id can delete a user', done =>{
    const user = new User({ username: 'Gebruiker' });
    user.save().then(() =>{
      request(app)
      .delete('/api/users/' + user._id)
      .end(()=>{
        User.findOne({username: 'Gebruiker'})
        .then((user) =>{
          assert(user === null);
          done();
        });
      });
    });
  });
});