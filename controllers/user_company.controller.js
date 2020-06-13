const db = require("../models");
const UserCompany = db.user_company;

exports.addEmployee = (req, res) => {

    const userCompany = {
        user_id: req.body.user_id,
        company_id: req.body.company_id,
        status: 'active'
    }

    UserCompany.create(userCompany) 
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};