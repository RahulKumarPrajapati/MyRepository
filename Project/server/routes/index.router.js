const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controllers/user.controller');
const ctrlTask = require('../controllers/task.controller');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/user',jwtHelper.verifyJwtToken, ctrlUser.user);
router.get('/task/findTaskById/:id', ctrlTask.findTaskById);
router.post('/task/add', ctrlTask.add);

module.exports = router;



