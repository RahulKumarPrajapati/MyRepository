const mongoose = require('mongoose');

const Task = require('../models/task.model');

module.exports.add = async(req, res, next) => {
    var taskData = {};
    var task = Task.taskModel;
    taskData.taskName = req.body.taskName;
    taskData.description = req.body.description;
    taskData.status = req.body.status;
    taskData.userId = req.body.userId;
    let response = await task.insertMany([taskData])
    res.status(200).json({response});
}

module.exports.findTaskById = async(req, res, next) => {
    userId = req.params.id;
    let response = await Task.taskModel.find({userId:userId})
    res.status(200).json({response});
    }

