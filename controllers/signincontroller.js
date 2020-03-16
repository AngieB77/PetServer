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
const sequelize = require("../db");
const User = sequelize.import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  // let name = req.body.name;
  //   let email = req.body.email;
  //   let pass = req.body.password;
  console.log("!************************!!!!!!");
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  })
    .then(console.log("TEST!!!!!!"))
    .then(
      (createSuccess = user => {
        let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60 * 24
        });
        res.json({
          user: user,
          message: "user created",
          sessionToken: token
        });
      })
    )
    .catch(
      (createErr = err => {
        res.send(500, "Improper signup", err.message);
        console.log("ERROR MESSAGE!!!!", err);
      })
    );
});

router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(
    user => {
      if (user) {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (matches) {
            let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
              expiresIn: 60 * 60 * 24
            });
            res.json({
              user: user,
              message: "successfully authenticated",
              sessionToken: token
            });
          } else {
            res
              .status(502)
              .send({ error: "bad gateway passwords don't match" });
          }
        });
      } else {
        res.status(500).send({ error: "failed to authenticate" });
      }
    },
    err => res.status(501).send({ error: "failed  to process" })
  );
});
module.exports = router;
