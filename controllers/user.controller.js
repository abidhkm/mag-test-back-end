const db = require("../models");
const tokenUtility = require('../utils/token')
const User = db.user;
const Login = db.login;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const user = {
        name: req.body.name,
        gender: req.body.gender,
        contact: req.body.contact,
    };

    let login = {
        password: req.body.password,
        email: req.body.email
    }

    User.create(user) //TODO use association query
        .then(dataUser => {
            login.id = dataUser.dataValues.id

            Login.create(login)
                .then(loginData => {
                    res.send(dataUser);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the User."
                    });
                });


        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};



exports.signIn = (req, res) => {

    let login = {
        password: req.body.password,
        email: req.body.email
    }

    Login.findOne({
        where: {
            password: login.password,
            email: login.email
        }
    })
        .then(data => {

            if (data) {
                const token = tokenUtility.generateToken(data.dataValues.email, data.dataValues.id);
                res.send({ token });
            }
            else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.search = (req, res) => { // TODO association query - email , avoid admins
    const query = req.query.search

    User.findAll({
        where: {
            name: { [Op.like]: '%' + query + '%' },
        },
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
}