/*let express = require('express');
let router = express.Router();
let sequelize = require('../db')
let rescueModel = sequelize.import('./models');

router.get('/', function (req, res){
    res.send('Hey');
});

router.post('/', function(req, res) {
    res.send('bye');
})
router.get('/contact', function(req,res){
    res.send({user: "name", email: "email", info: "info"});
});


module.exports = router;*/
const express = require("express");
const router = express.Router();
//const sequelize = require('../db');
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
   // let name = req.body.name;
  //   let email = req.body.email;
  //   let pass = req.body.password;
  console.log("!************************!!!!!!");
  User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then(console.log("TEST!!!!!!"))
    .then(
      function createSuccess(user) {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({
          user: user,
          message: "created",
          sessionToken: token
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    );
});

 router.post("/signin", function(req, res) {
  User.findOne({
    where: { username: req.body.user.name }
   }).then(
     function(user) {
       if (user) {
         bcrypt.compare(req.body.user.password, user.passwordhash, function(
           err,
           matches
         ) {
           if (matches) {
             let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
               expiresIN: 60 * 60 * 24
             });
             res.json({
               user: user,
              message: "successfully authenticated",
               sessionToken: token
             });
           } else {
           res.status(502).send({ error: "you failed" });
          }
        });
        res.json(user);
      } else {
         res.status(500).send({ error: "failed to authenticate" });
       }
     },
     function(err) {
      res.status(501).send({ error: "you failed" });
    }
   );
 });
module.exports = router;
