const { AuthServices } = require("../services");
const router = require('express').Router();

router.post('/auth/login', AuthServices.login);

module.exports = router