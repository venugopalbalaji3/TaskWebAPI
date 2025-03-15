const express = require("express");
const { body, validationResult } = require("express-validator");
const Task = require("../model/cln_task_info");
const {verifyToken} = require("../middlewares/authMiddleware");
const {ObjectId} = require("mongodb")

const router = express.Router();

// Create Task
router.post(
  "/create-task",
  verifyToken,
  [body("taskName").notEmpty(), body("dueDate").isISO8601()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const newTask = new Task({ ...req.body, userId: req.user.id });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  }
);

// Get Tasks
router.get("/list-task", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Task
router.put("/update-task", verifyToken, async (req, res) => {
  console.log(req.body,'request')
  try {
    const task = await Task.findOneAndUpdate(
      { _id:new ObjectId(req.body._id)},
      req.body,
      { new: true }
    );
    res.json(task);
  } catch (error) {
    console.log(error,'error')
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete Task
router.post("/delete-task",verifyToken, async (req, res) => {
  try {
    console.log(req.body,'deletee')
    await Task.findOneAndDelete({ _id:new ObjectId( req.body._id)});
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.log(error,'error')
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
