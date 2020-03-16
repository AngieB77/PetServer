const router = require("express").Router();
const sequelize = require("../db");
//var User = sequelize.import('../models/authtest');
// var AuthTestModel = sequelize.import('../models/authtest');
const Pet = sequelize.import("../models/pet");
const validateSession = require("../middleware/validate-session");

router.get("/", (req, res) => {
  Pet.findAll({ where: { userId: req.user.id } }).then(result =>
    res.status(200).json(result)
  );
});

router.get("/:id", (req, res) => {
  Pet.findOne({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(function findOneSuccess(data) {
      res.json(data);
    })
    .catch(function findOneError(err) {
      res.send(500, err.message);
    });
});

router.post("/create", (req, res) => {
  Pet.create({
    animal: req.body.animal,
    breed: req.body.breed,
    size: req.body.size,
    location: req.body.location,
    info: req.body.info,
    owner: req.body.owner,
    userId: req.user.id
  })
    .then(pet => res.status(200).json(pet))
    .catch(err => res.json(err.message));
});

router.put("/:id", (req, res) => {
  Pet.update(req.body, { where: { id: req.params.id, userId: req.user.id } })
    .then(pet =>
      res.json({
        pet: pet,
        message: "pet updated"
      })
    )
    .catch(err => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  Pet.destroy({
    where: { id: req.params.id, userId: req.user.id }
  })
    .then(function deleteLogSuccess(data) {
      res.send("removed log");
    })
    .catch(function deleteLogError(err) {
      res.send(500, err.message);
    });
});

/*
router.get('/getall', function (req, res) {
    let name = req.user.name;

    Pet.findAll({
        where: { name: name }
    })
    .then(
        function findAllSuccess(data){
            res.json(data);
        }
    );
});

// POINT TO PET
router.post('/', function(req, res){
    let owner = req.user.name;
    let email = req.body.email;
    console.log("post pet")

    Pet
    .create({
        pet: pet,
        name: name
    
     }).then(
         function createSuccess(pet) {
             res.json({
                 pet: pet
             });
         },
         function createError(err){
             res.send(500, err.message);
         }
     );

});

router.get('/', function(req, res)
{
    let data = req.params.name;
    let userid = req.user.email;
    Pet
    .findOne({
        where: {name: data, email: data}
    }).then(
        function findOneSuccess(data){
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    );
});

router.delete('/delete/:id', function(req, res){
    let data = req.params.id;
    let userid = req.user.id;

    Pet
    .destroy({
        where: { name:data, email: data}
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        }
    );
});

router.put('/update/:id', function(req, res){
    var data = req.params.id;
    var pet = req.body.pet.items;

    Pet
    .update({
        pet: pet
    },
    {where: {id: data}}
    ).then(
        function updateSuccess(updatedLog) {
            res.json({
             pet: pet
            });
        },
        function updateError(err){
            res.send(500, err.message);
        }
    )
});*/

module.exports = router;
