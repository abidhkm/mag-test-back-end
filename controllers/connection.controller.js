const db = require("../models");
const Relationship = db.relationship;

exports.sendConnection = (req, res) => {

    const connection = {
        first_party: req.body.company_id,
        second_party: req.body.second_party,
        status: 'pending'
    };

    // const user = req.user;

    Relationship.create(connection) //TODO use association query
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.respondConnection = (req, res) => {

    Relationship.update(
        { status: req.body.status },
        { returning: true, where: { id: req.body.connectionId } }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

exports.fetchRequests = (req, res) => {

    Relationship.findAll(
        {
            where: {
                second_party: req.body.company_id,
                status: 'pending'
            }
        }
    )
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};
