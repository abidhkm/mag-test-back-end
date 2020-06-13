var express = require('express');
var router = express.Router();
const company = require("../controllers/company.controller");
const connection = require("../controllers/connection.controller");
const userCompany = require("../controllers/user_company.controller");


const tokenUtility = require('../utils/token')

/* GET users listing. */
router.post("/create", tokenUtility.verifyToken ,company.create);
router.post("/request", tokenUtility.verifyToken ,connection.sendConnection);
router.put("/respond", tokenUtility.verifyToken ,connection.respondConnection);
router.get("/get-requests", tokenUtility.verifyToken ,connection.fetchRequests);
router.post("/new-employee", tokenUtility.verifyToken ,userCompany.addEmployee);

module.exports = router;
