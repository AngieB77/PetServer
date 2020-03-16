let jwt = require('jsonwebtoken');
const sequelize = require('../db');
const User = sequelize.import('../models/pet');
const validateSession = (req,res,next) => {

    if(req.method == 'OPTIONS') {
        next()
    } else {
        const token = req.headers.authorization;

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(!err && decoded) {
                User.findOne({
                    where: {id: decoded.id }
                },
                ).then(user => {
                    if(!user) throw err
                    req.user = user;

                    return next();
                })
                .catch(err => next(err))
            } else {
                req.errors = err;
                return res.status(500).send('Not authorized');

            }
        })
    }
}

module.exports = validateSession;
/*
module.exports = function(req, res, next) {
    if(req.method== 'OPTIONS') {
        next()
    }else{
        let sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if(!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided'
        }); else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded){
                    User.findOne({where: { id: decoded.id}}),then(user => {
                        req.user = user;
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Not authorized'});
                    });
                }else {
                    res.status(400).send({error: 'Not authorized'});
                }
            });
        }

    }}*/