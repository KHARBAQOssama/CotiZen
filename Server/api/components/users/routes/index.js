const { authenticated } = require("../../../middlewares");
const { AuthServices } = require("../services");
const router = require('express').Router();

router.post('/auth/login', AuthServices.login);
router.get('/auth/me',authenticated, AuthServices.me);
router.get('/auth/logout',authenticated, AuthServices.logout);

module.exports = router