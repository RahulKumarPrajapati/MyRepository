const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controllers/user.controller');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/user',jwtHelper.verifyJwtToken, ctrlUser.user);

module.exports = router;



