const express = require("express");
const { Task, Setting } = require("../models/model");
const router = express.Router();
const moment = require("moment");
const { setSetting } = require("../middleware/setting");
const { request } = require("express");

/*-----------------*/
// Task Routes
/*-----------------*/

router.post("/post", async (req, res) => {
  const data = new Task({
    Description: req.body.Description,
    Category: req.body.Category,
    StartingTime: req.body.StartingTime,
    Deadline: req.body.Deadline,
    EstimatedDuration: req.body.EstimatedDuration,
    ActualDuration: req.body.ActualDuration,
    Setting: req.setting._id,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const data = await Task.find();
    res.json({ data, setting: req.setting });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/getOne/:id", async (req, res) => {
  try {
    const data = await Task.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Task.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Task.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/*-----------------*/
// Setting Routes
/*-----------------*/

router.patch("/setting", async (req, res) => {
  try {
    const id = req.setting._id;
    const { usedHours } = req.setting;
    const updatedData = req.body;
    const options = { new: true };
    const data = await Setting.findByIdAndUpdate(id, updatedData, options);
    res.send({ ...data._doc, usedHours });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
