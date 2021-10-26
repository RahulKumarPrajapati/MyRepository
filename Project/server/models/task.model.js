const mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: 'Task Name can\'t be empty'
    },
    description: {
        type: String,
        required: 'Description can\'t be empty',
    },
    status: {
        type: String,
        required: 'Status can\'t be empty',
    },
    userId: {
        type: String,
        required: 'Id can\'t be empty'
    }
});

let TaskModel = mongoose.model("Task", taskSchema)

module.exports.taskModel = TaskModel