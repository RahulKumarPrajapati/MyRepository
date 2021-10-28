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
router.get('/fetchAllArchitect', ctrlTask.fetchAllArchitect);
router.get('/task/findAllTask', ctrlTask.findAllTask);
router.get('/task/findMyTask/:id', ctrlTask.findMyTask);
router.get('/task/getTask/:id', ctrlTask.getTask);
router.post('/task/edit', ctrlTask.edit);
router.delete('/task/delete/:id', ctrlTask.delete);


module.exports = router;



