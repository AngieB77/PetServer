const router = require('express').Router();
const sequelize = require('../db');
//var User = sequelize.import('../models/authtest');
// var AuthTestModel = sequelize.import('../models/authtest');
const Pet = sequelize.import('../models/pet');

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
});

module.exports = router;