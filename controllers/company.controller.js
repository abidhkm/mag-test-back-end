const db = require("../models");
const Company = db.company;
const CompanyAdmin = db.company_admin;

exports.create = (req, res) => {

    const company = {
        name: req.body.name,
        address: req.body.address,
        contact: req.body.contact,
        email: req.body.email,
    };

    const user = req.user;

    Company.create(company) //TODO use associated query
        .then(companyData => {

            const companyAdmin = {
                company_id: companyData.dataValues.id,
                user_id: user.id
            }

            CompanyAdmin.create(companyAdmin)
                .then(companyAdminData => {
                    res.send(companyAdminData);
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
