
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(

{
    taskName: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    },{
        collection:"cln_task_info"
    })

module.exports = mongoose.model("cln_task_info",taskSchema)