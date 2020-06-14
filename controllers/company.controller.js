const db = require("../models");
const Company = db.company;
const CompanyAdmin = db.company_admin;
const Op = db.Sequelize.Op;
const UserCompany = db.user_company;

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


exports.getCompany = (req, res) => {

    const user = req.user;

    CompanyAdmin.findOne({
        where: {
            user_id: user.id,
        }
    })
        .then(data => {

            if (data) {
                const companyId = data.dataValues.company_id


                Company.findOne({
                    where: {
                        id: companyId,
                    }
                })
                    .then(data => {

                        if (data) {
                            res.send(data);
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

    Company.findAll({
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


// exports.getEmployee = (req, res) => {

//     const companyId = req.query.companyId;

//     UserCompany.findAll({
//         where: {
//             company_id: companyId
//         },
//     }).then(data => {

//         (data.dataValues)

//         res.send(data);
//     })
//         .catch(err => {
//             console.log(err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while creating the User."
//             });
//         });
// };