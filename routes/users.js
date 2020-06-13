var express = require('express');
var router = express.Router();
const user = require("../controllers/user.controller");
const tokenUtility = require('../utils/token')

/* GET users listing. */
router.get("/", tokenUtility.verifyToken,  user.search);
router.post("/create", user.create);
router.post("/signin", user.signIn);


module.exports = router;
