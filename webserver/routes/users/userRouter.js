'use strict';
const router = require('express').Router();
// const mongoose = require('mongoose');
const User = require('./userEntity');
const passport = require('passport');
// const Strategy = require('passport-local').Strategy;
// const userCtrl = require('./userController');

router.post('/add', function(req, res) {
   let newUser = new User({
     username : req.body.username,
     password : req.body.password,
     name: req.body.name
   });

   newUser.save().then((doc)=>{
     console.log('Insertion success',doc);
     res.send('insertion success');
   },(err)=>{
     console.log(err);
     res.send(err,'not saved');
   });
});


// Get details of all user in the system
router.get('/', function(req, res) {
 console.log('Inside get');
  User.find({"_id" : "58a1aeee09f583558948c175"}).then((docs) => {
       res.send({
           docs
       });
   }, (err) => {
       res.send('Cant get the docs', err);
   });
 });

router.post('/login', function(req, res) {
    console.log(req.body.username);
    User.findOne({"username" : req.body.username}, function(err, docs){
      if(docs==null || err)
      res.send({responseText:'not authenticated'});
      else
      res.send({responseText:'authenticated'});
    });
});

router.get('/logout', function(req, res){
console.log('Session deleted');
req.session.destroy();
res.send({redirect:'/'});
});

module.exports = router;
